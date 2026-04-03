import { useEffect, useRef } from "react";
import * as THREE from "three";

// Helper function to create gradient canvas texture
const createGradientTexture = (color1: THREE.Color, color2: THREE.Color) => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 256, 256);
    gradient.addColorStop(0, `#${color1.getHexString()}`);
    gradient.addColorStop(1, `#${color2.getHexString()}`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
};

const useBlockchainAnimation = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const accentColor = new THREE.Color("hsl(234, 85%, 55%)");
    const secondaryColor = new THREE.Color("hsl(260, 80%, 60%)");
    const gradientColor1 = new THREE.Color("hsl(280, 100%, 70%)"); // Pink
    const gradientColor2 = new THREE.Color("hsl(180, 100%, 60%)"); // Cyan
    
    interface Block {
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
      rotSpeed: THREE.Vector3;
      originalPos: THREE.Vector3;
      radius: number;
    }
    
    const blocks: Block[] = [];
    const lines: Array<{ line: THREE.Line; startPos: THREE.Vector3; endPos: THREE.Vector3; offset: number }> = [];

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    window.addEventListener("mousemove", (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    const createBlock = () => {
      const size = 0.4 + Math.random() * 0.6;
      
      // Create rounded box geometry
      const geo = new THREE.BoxGeometry(size, size, size);
      
      // Create gradient texture
      const gradientTexture = createGradientTexture(gradientColor1, gradientColor2);
      
      // Create material with gradient
      const material = new THREE.MeshPhongMaterial({
        map: gradientTexture,
        color: 0xffffff,
        emissive: new THREE.Color("hsl(260, 60%, 50%)"),
        opacity: 0.95,
        transparent: true,
        wireframe: false,
        shininess: 100,
      });

      // Add bevel/rounded edges by subdividing geometry
      const positions = geo.attributes.position as THREE.BufferAttribute;
      const indexAttr = geo.index;
      
      // Round the corners by moving vertices slightly inward
      const posArray = positions.array as Float32Array;
      for (let i = 0; i < posArray.length; i += 3) {
        const x = posArray[i];
        const y = posArray[i + 1];
        const z = posArray[i + 2];
        
        const axisX = Math.abs(x);
        const axisY = Math.abs(y);
        const axisZ = Math.abs(z);
        
        const chamferAmount = 0.05;
        if (axisX > size / 2 - chamferAmount) posArray[i] *= 0.95;
        if (axisY > size / 2 - chamferAmount) posArray[i + 1] *= 0.95;
        if (axisZ > size / 2 - chamferAmount) posArray[i + 2] *= 0.95;
      }
      positions.needsUpdate = true;
      
      // Also add wireframe for tech feel
      const edges = new THREE.EdgesGeometry(geo);
      const edgeMat = new THREE.LineBasicMaterial({ 
        color: secondaryColor, 
        transparent: true, 
        opacity: 0.8,
        linewidth: 3,
      });
      const wireframe = new THREE.LineSegments(edges, edgeMat);
      
      const mesh = new THREE.Mesh(geo, material);
      mesh.add(wireframe);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const posX = (Math.random() - 0.5) * 30;
      const posY = (Math.random() - 0.5) * 20;
      const posZ = (Math.random() - 0.5) * 10;

      mesh.position.set(posX, posY, posZ);

      scene.add(mesh);
      blocks.push({
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.002
        ),
        rotSpeed: new THREE.Vector3(
          Math.random() * 0.005,
          Math.random() * 0.005,
          Math.random() * 0.003
        ),
        originalPos: new THREE.Vector3(posX, posY, posZ),
        radius: size / 2,
      });
    };

    // Create ambient and directional light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(15, 15, 15);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    for (let i = 0; i < 20; i++) createBlock();

    let connectionTimer = 0;

    const updateConnections = () => {
      lines.forEach((l) => scene.remove(l.line));
      lines.length = 0;

      for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
          const dist = blocks[i].mesh.position.distanceTo(blocks[j].mesh.position);
          if (dist < 8) {
            const startPos = blocks[i].mesh.position.clone();
            const endPos = blocks[j].mesh.position.clone();
            const points = [startPos, endPos];
            const geo = new THREE.BufferGeometry().setFromPoints(points);
            const mat = new THREE.LineBasicMaterial({
              color: secondaryColor,
              transparent: true,
              opacity: Math.max(0.1, 0.25 * (1 - dist / 8)),
              linewidth: 8,
              fog: false,
            });
            const line = new THREE.Line(geo, mat);
            scene.add(line);
            lines.push({
              line,
              startPos,
              endPos,
              offset: Math.random(),
            });
          }
        }
      }
    };

    // Collision detection and response
    const checkCollisions = () => {
      for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
          const block1 = blocks[i];
          const block2 = blocks[j];
          
          const dist = block1.mesh.position.distanceTo(block2.mesh.position);
          const minDist = block1.radius + block2.radius;
          
          if (dist < minDist) {
            // Calculate direction from block2 to block1
            const direction = new THREE.Vector3()
              .subVectors(block1.mesh.position, block2.mesh.position)
              .normalize();
            
            // Push blocks apart
            const overlap = minDist - dist;
            const pushAmount = overlap / 2 + 0.01;
            
            block1.mesh.position.addScaledVector(direction, pushAmount);
            block2.mesh.position.addScaledVector(direction, -pushAmount);
            
            // Bounce effect - reverse velocity
            const temp = block1.velocity.clone();
            block1.velocity.copy(block2.velocity);
            block2.velocity.copy(temp);
            
            // Add slight dampening
            block1.velocity.multiplyScalar(0.98);
            block2.velocity.multiplyScalar(0.98);
          }
        }
      }
    };

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      blocks.forEach(({ mesh, velocity, rotSpeed }) => {
        // Move cubes
        mesh.position.add(velocity);
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;
        mesh.rotation.z += rotSpeed.z;

        // Wrap around boundaries (infinite loop)
        const boundsX = 30;
        const boundsY = 20;
        const boundsZ = 10;

        if (mesh.position.x > boundsX) mesh.position.x = -boundsX;
        if (mesh.position.x < -boundsX) mesh.position.x = boundsX;
        if (mesh.position.y > boundsY) mesh.position.y = -boundsY;
        if (mesh.position.y < -boundsY) mesh.position.y = boundsY;
        if (mesh.position.z > boundsZ) mesh.position.z = -boundsZ;
        if (mesh.position.z < -boundsZ) mesh.position.z = boundsZ;

        // Mouse interaction - slight pull toward cursor
        mesh.position.x += mouse.x * 0.015;
        mesh.position.y += mouse.y * 0.015;
      });

      // Check and handle collisions
      checkCollisions();

      // Update line animations with slower traveling effect
      connectionTimer++;
      if (connectionTimer % 5 === 0) updateConnections(); // Slower update

      // Animate traveling effect on lines (much slower)
      lines.forEach(({ line, offset }) => {
        const progress = (connectionTimer * 0.005 + offset) % 1; // Even slower animation
        
        if (line.geometry instanceof THREE.BufferGeometry) {
          const material = line.material as THREE.LineBasicMaterial;
          // Smoother, slower pulsing effect
          material.opacity = 0.12 + Math.sin(progress * Math.PI * 2) * 0.13;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w;
      canvas.height = h;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      scene.clear();
    };
  }, [canvasRef]);
};

export default useBlockchainAnimation;

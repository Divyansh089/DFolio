import { useEffect, useRef } from "react";
import * as THREE from "three";

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
    const blocks: { mesh: THREE.Mesh; velocity: THREE.Vector3; rotSpeed: THREE.Vector3 }[] = [];
    const lines: THREE.Line[] = [];

    const createBlock = () => {
      const size = 0.4 + Math.random() * 0.6;
      const geo = new THREE.BoxGeometry(size, size, size);
      const edges = new THREE.EdgesGeometry(geo);
      const mat = new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.25 });
      const mesh = new THREE.LineSegments(edges, mat) as unknown as THREE.Mesh;

      mesh.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );

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
      });
    };

    for (let i = 0; i < 20; i++) createBlock();

    let connectionTimer = 0;

    const updateConnections = () => {
      lines.forEach((l) => scene.remove(l));
      lines.length = 0;

      for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
          const dist = blocks[i].mesh.position.distanceTo(blocks[j].mesh.position);
          if (dist < 8) {
            const points = [blocks[i].mesh.position.clone(), blocks[j].mesh.position.clone()];
            const geo = new THREE.BufferGeometry().setFromPoints(points);
            const mat = new THREE.LineBasicMaterial({
              color: accentColor,
              transparent: true,
              opacity: Math.max(0, 0.12 * (1 - dist / 8)),
            });
            const line = new THREE.Line(geo, mat);
            scene.add(line);
            lines.push(line);
          }
        }
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      blocks.forEach(({ mesh, velocity, rotSpeed }) => {
        mesh.position.add(velocity);
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;
        mesh.rotation.z += rotSpeed.z;
      });

      connectionTimer++;
      if (connectionTimer % 3 === 0) updateConnections();

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
      renderer.dispose();
      scene.clear();
    };
  }, [canvasRef]);
};

export default useBlockchainAnimation;

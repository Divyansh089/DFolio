import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { resumeData } from "../data/resumeData";
import useBlockchainAnimation from "../hooks/useBlockchainAnimation";
import { useTypingAnimation } from "../hooks/useTypingAnimation";

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  useBlockchainAnimation(canvasRef);

  const { displayText, showCursor } = useTypingAnimation({
    texts: [
      "Blockchain Developer",
      "Software Engineer",
      "Full Stack Developer",
    ],
    typingSpeed: 60,
    deletingSpeed: 30,
    pauseBeforeDelete: 500,
    pauseBetweenTexts: 300,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-tag", { opacity: 0, y: 30, duration: 0.6, delay: 0.3 })
        .from(".hero-name", { opacity: 0, y: 40, duration: 0.7 }, "-=0.3")
        .from(".hero-subtitle", { opacity: 0, y: 30, duration: 0.6 }, "-=0.3")
        .from(".hero-buttons", { opacity: 0, y: 30, duration: 0.6 }, "-=0.3")
        .from(".hero-socials", { opacity: 0, y: 20, duration: 0.5 }, "-=0.2")
        .from(".hero-image", { opacity: 0, scale: 0.85, duration: 1, ease: "back.out(1.4)" }, "-=0.6")
        .from(".hero-scroll-hint", { opacity: 0, y: -10, duration: 0.5 }, "-=0.2");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { hero } = resumeData;

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <div className="hero-tag flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-primary" />
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary flex items-center">
              {displayText}
              <span className={`ml-0.5 inline-block w-2 h-5 bg-primary transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`} style={{ animation: showCursor ? "none" : "none" }} />
            </span>
          </div>

          <h1 className="hero-name text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] mb-6 font-display">
            Hi, I'm{" "}
            <span className="text-primary relative">
              {hero.name.split(" ")[0]}
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 2 150 2 198 8" stroke="hsl(234, 85%, 55%)" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
              </svg>
            </span>
            <br />
            <span className="text-muted-foreground text-4xl md:text-5xl lg:text-6xl">
              {hero.name.split(" ")[1]}
            </span>
          </h1>

          <p className="hero-subtitle text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            {hero.subtitle}
          </p>

          <div className="hero-buttons flex flex-wrap gap-4 mb-8">
            <a href="#projects" className="btn-primary group">
              View Projects
              <svg className="w-4 h-4 ml-1 inline-block group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#contact" className="btn-outline">Contact Me</a>
          </div>

          <div className="hero-socials flex gap-4 items-center">
            {hero.socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                {s.platform === "GitHub" ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                )}
              </a>
            ))}
            <span className="text-xs text-muted-foreground/50 ml-2 font-mono">// find me online</span>
          </div>
        </div>

        {/* Right */}
        <div className="hero-image flex justify-center lg:justify-end items-start">
          <div className="relative -mt-12">
            <img
              src="/images/avatar.png"
              alt={hero.name}
              className="relative w-80 h-80 md:w-96 md:h-96 rounded-full object-cover border-4 border-background shadow-2xl"
              style={{ boxShadow: "var(--shadow-accent)" }}
            />
            {/* Status badge */}
            <div className="absolute bottom-4 right-4 bg-card border border-border rounded-full px-3 py-1.5 flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-foreground">Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground/50 font-mono">scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/20 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

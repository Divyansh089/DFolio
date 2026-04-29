import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";
import { cn } from "../lib/utils";
import { useIsMobile } from "../hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const skillArt: Record<string, string> = {
  Blockchain: "/svg/blockchain.svg",
  Frontend: "/svg/frontend.svg",
  Backend: "/svg/backend.svg",
  Languages: "/svg/languages.svg",
  "DevOps & Tools": "/svg/devops-tools.svg",
  "Hyperledger Fabric": "/svg/hyperledger-fabric.svg",
};

const cardAccents: Record<string, { cardBg: string; cardBorder: string; tagBg: string; tagText: string }> = {
  Blockchain:           { cardBg: "bg-[#f5f4ff]", cardBorder: "border-[#c5c2f7]", tagBg: "bg-[#ede9ff]", tagText: "text-[#3d3bdb]" },
  Frontend:             { cardBg: "bg-[#f0f4ff]", cardBorder: "border-[#bfcef7]", tagBg: "bg-[#e6ecff]", tagText: "text-[#2952cc]" },
  Backend:              { cardBg: "bg-[#f2f5ff]", cardBorder: "border-[#c2cbf5]", tagBg: "bg-[#eaedff]", tagText: "text-[#3342c9]" },
  Languages:            { cardBg: "bg-[#f7f5ff]", cardBorder: "border-[#cec8f8]", tagBg: "bg-[#efecff]", tagText: "text-[#4535d4]" },
  "DevOps & Tools":     { cardBg: "bg-[#f4f2ff]", cardBorder: "border-[#c9c4f6]", tagBg: "bg-[#edeaff]", tagText: "text-[#3d3bdb]" },
  "Hyperledger Fabric": { cardBg: "bg-[#f3f0ff]", cardBorder: "border-[#c8c1f7]", tagBg: "bg-[#ece8ff]", tagText: "text-[#4030cc]" },
};

const Skills = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const avatarRef   = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent]     = useState(0);
  const [animating, setAnimating] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const skills = resumeData.skills;
  const total  = skills.length;
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header AOS
      gsap.from(headerRef.current, {
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });
      // Avatar AOS
      gsap.from(avatarRef.current, {
        x: 40, opacity: 0, duration: 0.9, delay: 0.2, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });
      // Carousel AOS
      gsap.from(carouselRef.current, {
        x: -30, opacity: 0, duration: 0.8, delay: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });
      // Dot indicators AOS
      gsap.from(".skill-dots", {
        y: 20, opacity: 0, duration: 0.5, delay: 0.3, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const resetTimer = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % total);
    }, 2800);
  }, [total]);

  useEffect(() => {
    resetTimer();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [resetTimer]);

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(((idx % total) + total) % total);
    setTimeout(() => setAnimating(false), 520);
    resetTimer();
  };

  // Responsive carousel dimensions
  const CARD_W  = isMobile ? Math.min(window.innerWidth - 48, 340) : 520;
  const CARD_H  = isMobile ? 260 : 300;
  const TRACK_W = isMobile ? Math.min(window.innerWidth - 32, 380) : 780;
  const SPREAD  = isMobile ? 70 : 130;
  const DEPTH   = isMobile ? 50 : 80;

  const getCardStyle = (idx: number): React.CSSProperties => {
    let offset = idx - current;
    if (offset >  total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const abs = Math.abs(offset);

    if (abs > 2) {
      return {
        transform:     "translateX(0px) translateZ(-400px) scale(0.3)",
        opacity:       0,
        zIndex:        0,
        pointerEvents: "none",
        transition:    "none",
      };
    }

    const centreOffset = (TRACK_W - CARD_W) / 2;
    const tx      = centreOffset + offset * SPREAD;
    const tz      = -(abs * DEPTH);
    const ry      = offset * 10;
    const scale   = abs === 0 ? 1 : abs === 1 ? 0.85 : 0.70;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.60 : 0.32;

    return {
      transform:     `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
      opacity,
      zIndex:        100 - abs,
      pointerEvents: "auto",
    };
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding bg-[#f5f5ff]"
    >
      <div className="section-container">

        <div className="grid min-h-0 lg:min-h-[560px] grid-cols-1 lg:grid-cols-[7fr_3fr] items-start gap-6 lg:gap-0">

          {/* ── LEFT ──────────────────────────────────────────────────── */}
          <div ref={carouselRef} className="flex flex-col pt-2">

            <div ref={headerRef} className="mb-4 lg:mb-[26px] text-center lg:text-left">
              <span className="section-label font-semibold">Skills</span>
              <h2 className="section-heading mb-0">My Technical Toolkit</h2>
            </div>

            {/* Carousel */}
            <div className="overflow-visible [perspective:1000px] flex justify-center lg:justify-start">
              <div
                className="relative overflow-visible [transform-style:preserve-3d]"
                style={{ width: TRACK_W, height: CARD_H + 20 }}
              >
                {skills.map((skill, idx) => {
                  const accent   = cardAccents[skill.name] ?? cardAccents["Blockchain"];
                  const art      = skillArt[skill.name];
                  const isActive = idx === current;

                  return (
                    <div
                      key={skill.name}
                      className={cn(
                        "absolute top-0 left-0 flex flex-col justify-between",
                        "overflow-hidden rounded-[20px] border p-4 sm:p-[26px_24px]",
                        "transition-[transform,opacity] duration-[520ms]",
                        "[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
                        isActive ? "cursor-default" : "cursor-pointer",
                        accent.cardBg,
                        accent.cardBorder,
                      )}
                      style={{
                        ...getCardStyle(idx),
                        width:  CARD_W,
                        height: CARD_H,
                      }}
                      onClick={() => !isActive && goTo(idx)}
                    >
                      {art && (
                        <div className="pointer-events-none absolute -bottom-1 -right-1 select-none">
                          <img src={art} alt="" className="h-[70px] w-[70px] sm:h-[110px] sm:w-[110px]" draggable={false} />
                        </div>
                      )}

                      <div className="relative z-[1]">
                        <div className="mb-1.5 text-[22px] sm:text-[28px] leading-none">{skill.icon}</div>
                        <h3 className="m-0 text-[14px] sm:text-[17px] font-bold text-[#1a1a2e] [font-family:var(--font-display,inherit)]">
                          {skill.name}
                        </h3>
                        <p className="mt-[5px] max-w-[75%] text-[10px] sm:text-xs leading-[1.5] text-[#555570]">
                          {skill.description}
                        </p>
                      </div>

                      <div className="relative z-[1] flex flex-wrap gap-1 sm:gap-1.5">
                        {skill.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className={cn(
                              "rounded-full border px-2 py-[2px] sm:px-[10px] sm:py-[3px] text-[9px] sm:text-[11px] font-medium",
                              accent.cardBorder,
                              accent.tagBg,
                              accent.tagText,
                            )}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* dot indicators */}
            <div className="skill-dots mt-4 sm:mt-6 flex w-full items-center justify-center gap-[7px]">
              {skills.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to skill ${i + 1}`}
                  className={cn(
                    "h-[10px] cursor-pointer rounded border-0 p-0 transition-all duration-300",
                    i === current ? "w-[30px] bg-[#5b4fff]" : "w-[10px] bg-[#c5c2f7]",
                  )}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: avatar ─────────────────────────────────────────── */}
          <div
            ref={avatarRef}
            className="hidden lg:flex h-full min-h-[480px] items-end justify-end"
          >
            <img
              src="/images/ch-3.png"
              alt="Divyansh avatar"
              draggable={false}
              className={cn(
                "h-auto w-full select-none -mb-8",
                "max-w-[320px] lg:max-w-[380px] xl:max-w-[420px]",
                "drop-shadow-[0_8px_40px_rgba(91,79,255,0.22)]",
              )}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
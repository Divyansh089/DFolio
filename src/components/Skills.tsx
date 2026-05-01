import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";
import { cn } from "../lib/utils";
import { useIsMobile } from "../hooks/use-mobile";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  Blockchain: { cardBg: "bg-[#f5f4ff]", cardBorder: "border-[#c5c2f7]", tagBg: "bg-[#ede9ff]", tagText: "text-[#3d3bdb]" },
  Frontend: { cardBg: "bg-[#f0f4ff]", cardBorder: "border-[#bfcef7]", tagBg: "bg-[#e6ecff]", tagText: "text-[#2952cc]" },
  Backend: { cardBg: "bg-[#f2f5ff]", cardBorder: "border-[#c2cbf5]", tagBg: "bg-[#eaedff]", tagText: "text-[#3342c9]" },
  Languages: { cardBg: "bg-[#f7f5ff]", cardBorder: "border-[#cec8f8]", tagBg: "bg-[#efecff]", tagText: "text-[#4535d4]" },
  "DevOps & Tools": { cardBg: "bg-[#f4f2ff]", cardBorder: "border-[#c9c4f6]", tagBg: "bg-[#edeaff]", tagText: "text-[#3d3bdb]" },
  "Hyperledger Fabric": { cardBg: "bg-[#f3f0ff]", cardBorder: "border-[#c8c1f7]", tagBg: "bg-[#ece8ff]", tagText: "text-[#4030cc]" },
};

const Skills = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const skills = resumeData.skills;
  const total = skills.length;

  // Dynamic sizing — adapts to mobile
  const CARD_W = isMobile ? 260 : 520;
  const CARD_H = isMobile ? 260 : 300;
  const TRACK_W = isMobile ? 280 : 780;
  const SPREAD = isMobile ? 60 : 130;
  const DEPTH = isMobile ? 40 : 80;

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });

      if (!isMobile && avatarRef.current) {
        gsap.from(avatarRef.current, {
          x: 40, opacity: 0, duration: 0.9, delay: 0.2, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        });
      }

      gsap.from(carouselRef.current, {
        x: -30, opacity: 0, duration: 0.8, delay: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });

      // Scroll-linked motion
      if (trackRef.current) {
        gsap.fromTo(
          trackRef.current,
          { y: 36, opacity: 0.7, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 88%",
              end: "top 35%",
              scrub: 1,
            },
          },
        );
      }

      if (!isMobile && avatarRef.current) {
        gsap.fromTo(
          avatarRef.current,
          { y: 48 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              end: "bottom 30%",
              scrub: 1.2,
            },
          },
        );
      }

      // AOS for dot indicators
      gsap.from(".skill-dot", {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".skill-dots-container",
          start: "top 90%",
          toggleActions: "play none none reset",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isMobile]);

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


  const getCardStyle = (idx: number): React.CSSProperties => {
    let offset = idx - current;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;

    const abs = Math.abs(offset);

    if (abs > 2) {
      return {
        transform: "translateX(0px) translateZ(-400px) scale(0.3)",
        opacity: 0,
        zIndex: 0,
        pointerEvents: "none",
        transition: "none",
      };
    }

    const centreOffset = (TRACK_W - CARD_W) / 2;
    const tx = centreOffset + offset * SPREAD;
    const tz = -(abs * DEPTH);
    const ry = offset * 10;
    const scale = abs === 0 ? 1 : abs === 1 ? 0.85 : 0.70;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.60 : 0.32;

    return {
      transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
      opacity,
      zIndex: 100 - abs,
      pointerEvents: "auto",
    };
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding bg-secondary/50"
    >
      <div className="section-container">

        {/* Mobile: single column. Desktop: 7fr / 3fr */}
        <div className={cn(
          "grid items-start gap-0",
          isMobile
            ? "grid-cols-1 min-h-0"
            : "min-h-[560px] grid-cols-[7fr_3fr]"
        )}>

          {/* ── LEFT ──────────────────────────────────────────────────── */}
          <div ref={carouselRef} className="flex flex-col pt-2">

            <div ref={headerRef} className={cn("mb-5 sm:mb-[26px]", isMobile && "text-center")}>
              <span className="section-label font-semibold">Skills</span>
              <h2 className="section-heading mb-0">My Technical Toolkit</h2>
            </div>

            <div ref={trackRef} className="overflow-visible [perspective:1000px]">
              <div
                className="relative overflow-visible [transform-style:preserve-3d] mx-auto"
                style={{ width: TRACK_W, height: CARD_H + 20 }}
              >
                {skills.map((skill, idx) => {
                  const accent = cardAccents[skill.name] ?? cardAccents["Blockchain"];
                  const art = skillArt[skill.name];
                  const isActive = idx === current;

                  return (
                    <div
                      key={skill.name}
                      className={cn(
                        "absolute top-0 left-0 flex flex-col justify-between",
                        "overflow-hidden rounded-[20px] border",
                        isMobile ? "p-4" : "p-[26px_24px]",
                        "transition-[transform,opacity] duration-[520ms]",
                        "[transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
                        isActive ? "cursor-default" : "cursor-pointer",
                        accent.cardBg,
                        accent.cardBorder,
                      )}
                      style={{
                        ...getCardStyle(idx),
                        width: CARD_W,
                        height: CARD_H,
                      }}
                      onClick={() => !isActive && goTo(idx)}
                    >
                      {art && (
                        <div className="pointer-events-none absolute -bottom-1 -right-1 select-none">
                          <img
                            src={art}
                            alt=""
                            className={cn(
                              isMobile ? "h-[70px] w-[70px]" : "h-[110px] w-[110px]"
                            )}
                            draggable={false}
                          />
                        </div>
                      )}

                      <div className="relative z-[1]">
                        <div className={cn("mb-1.5 leading-none", isMobile ? "text-[22px]" : "text-[28px]")}>{skill.icon}</div>
                        <h3 className={cn(
                          "m-0 font-bold text-[#1a1a2e] [font-family:var(--font-display,inherit)]",
                          isMobile ? "text-[14px]" : "text-[17px]"
                        )}>
                          {skill.name}
                        </h3>
                        <p className={cn(
                          "mt-[5px] max-w-[75%] leading-[1.5] text-[#555570]",
                          isMobile ? "text-[10px]" : "text-xs"
                        )}>
                          {skill.description}
                        </p>
                      </div>

                      <div className="relative z-[1] flex flex-wrap gap-1 sm:gap-1.5">
                        {skill.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className={cn(
                              "rounded-full border font-medium",
                              isMobile ? "px-2 py-[2px] text-[9px]" : "px-[10px] py-[3px] text-[11px]",
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

            {/* Refined Minimalist Pagination */}
            <div className="skill-dots-container mt-10 flex w-full items-center justify-center">
              <div className="flex items-center gap-3">
                {skills.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to skill ${i + 1}`}
                    className={cn(
                      "h-3 cursor-pointer rounded-full border-0 p-0 transition-all duration-500",
                      i === current 
                        ? "w-10 bg-primary shadow-[0_0_15px_rgba(91,79,255,0.4)]" 
                        : "w-3 bg-primary/20 hover:bg-primary/40",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: avatar (hidden on mobile) ────────────────────── */}
          {!isMobile && (
            <div
              ref={avatarRef}
              className="flex h-full min-h-[480px] items-end justify-end"
            >
              <img
                src="/images/ch-3.png"
                alt="Divyansh avatar"
                draggable={false}
                className={cn(
                  "h-auto w-full select-none -mb-8",
                  "max-w-[320px] lg:max-w-[380px] xl:max-w-[420px]",
                  "drop-shadow-[0_14px_60px_rgba(91,79,255,0.38)]",
                )}
              />
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Skills;
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";
import { cn } from "../lib/utils";

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

// ── Carousel constants ────────────────────────────────────────────────────
// CARD_W is the fixed pixel width of every card.
// The track is wider (TRACK_W) so side-cards have space to slide into.
// Side cards spread SPREAD px per step — must be less than CARD_W so they
// stay behind the active card yet visibly peek out on each side.
const CARD_W  = 520;   // px  — active card width
const CARD_H  = 300;   // px  — card height
const TRACK_W = 780;   // px  — stage width  (CARD_W + 2 × visible-peek margin)
const SPREAD  = 130;   // px  — how far each step shifts left/right
const DEPTH   = 80;    // px  — Z recession per step

const Skills = () => {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const avatarRef   = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const [current, setCurrent]     = useState(0);
  const [animating, setAnimating] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const skills = resumeData.skills;
  const total  = skills.length;

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 30, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
      gsap.from(avatarRef.current, {
        x: 40, opacity: 0, duration: 0.9, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
      gsap.from(carouselRef.current, {
        x: -30, opacity: 0, duration: 0.8, delay: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      // Scroll-linked motion so the section feels alive while user scrolls.
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

      if (avatarRef.current) {
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

    // Centre of track — cards start at left:0 and are nudged to centre
    const centreOffset = (TRACK_W - CARD_W) / 2;   // 130px
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

        <div className="grid min-h-[560px] grid-cols-[7fr_3fr] items-start gap-0">

          {/* ── LEFT ──────────────────────────────────────────────────── */}
          <div ref={carouselRef} className="flex flex-col pt-2">

            <div ref={headerRef} className="mb-[26px]">
              <span className="section-label font-semibold">Skills</span>
              <h2 className="section-heading mb-0">My Technical Toolkit</h2>
            </div>

            {/*
              Perspective wrapper — overflow:visible so peeking cards aren't clipped.
              The inner track has a fixed pixel width & height.
              Cards are positioned absolute from left:0 inside the track,
              then shifted right by centreOffset so the active card sits
              in the middle of the track.
            */}
            <div ref={trackRef} className="overflow-visible [perspective:1000px]">
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
                        // Fixed size — NOT inset-0
                        "absolute top-0 left-0 flex flex-col justify-between",
                        "overflow-hidden rounded-[20px] border p-[26px_24px]",
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
                          <img src={art} alt="" className="h-[110px] w-[110px]" draggable={false} />
                        </div>
                      )}

                      <div className="relative z-[1]">
                        <div className="mb-1.5 text-[28px] leading-none">{skill.icon}</div>
                        <h3 className="m-0 text-[17px] font-bold text-[#1a1a2e] [font-family:var(--font-display,inherit)]">
                          {skill.name}
                        </h3>
                        <p className="mt-[5px] max-w-[75%] text-xs leading-[1.5] text-[#555570]">
                          {skill.description}
                        </p>
                      </div>

                      <div className="relative z-[1] flex flex-wrap gap-1.5">
                        {skill.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className={cn(
                              "rounded-full border px-[10px] py-[3px] text-[11px] font-medium",
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
            <div className="mt-6 flex w-full items-center justify-center gap-[7px]">
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

        </div>
      </div>
    </section>
  );
};

export default Skills;
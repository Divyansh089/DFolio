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

// Accent colours per card (matches hero purple palette, tinted variants)
const cardAccents: Record<string, { cardBg: string; cardBorder: string; tagBg: string; tagText: string }> = {
  Blockchain: { cardBg: "bg-[#f5f4ff]", cardBorder: "border-[#c5c2f7]", tagBg: "bg-[#ede9ff]", tagText: "text-[#3d3bdb]" },
  Frontend: { cardBg: "bg-[#f0f4ff]", cardBorder: "border-[#bfcef7]", tagBg: "bg-[#e6ecff]", tagText: "text-[#2952cc]" },
  Backend: { cardBg: "bg-[#f2f5ff]", cardBorder: "border-[#c2cbf5]", tagBg: "bg-[#eaedff]", tagText: "text-[#3342c9]" },
  Languages: { cardBg: "bg-[#f7f5ff]", cardBorder: "border-[#cec8f8]", tagBg: "bg-[#efecff]", tagText: "text-[#4535d4]" },
  "DevOps & Tools": { cardBg: "bg-[#f4f2ff]", cardBorder: "border-[#c9c4f6]", tagBg: "bg-[#edeaff]", tagText: "text-[#3d3bdb]" },
  "Hyperledger Fabric": { cardBg: "bg-[#f3f0ff]", cardBorder: "border-[#c8c1f7]", tagBg: "bg-[#ece8ff]", tagText: "text-[#4030cc]" },
};

const Skills = () => {
  const sectionRef   = useRef<HTMLDivElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);
  const avatarRef    = useRef<HTMLDivElement>(null);
  const carouselRef  = useRef<HTMLDivElement>(null);
  const [current, setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const skills = resumeData.skills;
  const total  = skills.length;

  // ── section entrance animation ──────────────────────────────────────────
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── auto-rotate ──────────────────────────────────────────────────────────
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

  // Dynamic carousel positioning remains inline because transform/opacity are calculated per card.
  const getCardStyle = (idx: number): React.CSSProperties => {
    const offset  = idx - current;
    const wrapped = ((offset + total) % total) > total / 2
      ? offset - total
      : (((offset + total) % total) < total / 2 ? offset : offset);
    const abs     = Math.abs(wrapped);
    const visible = abs <= 2;
    return {
      transform:  `translateX(${wrapped * 62}px) translateZ(${-abs * 110}px) rotateY(${wrapped * 15}deg) scale(${abs === 0 ? 1 : abs === 1 ? 0.83 : 0.67})`,
      opacity:    abs === 0 ? 1 : abs === 1 ? 0.52 : visible ? 0.22 : 0,
      zIndex:     100 - abs,
    };
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding bg-[#f5f5ff]"
    >
      <div className="section-container">
        {/* ── 75 / 25 split ───────────────────────────────────────────── */}
        <div className="grid min-h-[560px] grid-cols-[3fr_1fr] items-start gap-10">

          {/* ── LEFT: header + carousel ───────────────────────────────── */}
          <div ref={carouselRef} className="flex flex-col pt-2">

            {/* header */}
            <div ref={headerRef} className="mb-[26px]">
              <span className="section-label font-semibold">Skills</span>
              <h2 className="section-heading mb-0">
                My Technical Toolkit
              </h2>
            </div>

            {/* 3D carousel stage */}
            <div className="w-full [perspective:900px]">
              <div className="relative h-[290px] [transform-style:preserve-3d]">
                {skills.map((skill, idx) => {
                  const accent = cardAccents[skill.name] ?? cardAccents["Blockchain"];
                  const art    = skillArt[skill.name];
                  const isActive = idx === current;
                  return (
                    <div
                      key={skill.name}
                      className={cn(
                        "absolute inset-0 flex min-h-[250px] h-full w-full flex-col justify-between overflow-hidden rounded-[20px] border p-[26px_24px] transition-all duration-[520ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)]",
                        isActive ? "cursor-default" : "cursor-pointer",
                        accent.cardBg,
                        accent.cardBorder,
                      )}
                      style={getCardStyle(idx)}
                      onClick={() => !isActive && goTo(idx)}
                    >
                      {/* background art */}
                      {art && (
                        <div className="pointer-events-none absolute -bottom-1 -right-1 select-none">
                          <img src={art} alt="" className="h-[110px] w-[110px]" draggable={false} />
                        </div>
                      )}

                      {/* content */}
                      <div className="relative z-[1]">
                        <div className="mb-1.5 text-[28px] leading-none">
                          {skill.icon}
                        </div>
                        <h3 className="m-0 text-[17px] font-bold text-[#1a1a2e] [font-family:var(--font-display,inherit)]">
                          {skill.name}
                        </h3>
                        <p className="mt-[5px] max-w-[75%] text-xs leading-[1.5] text-[#555570]">
                          {skill.description}
                        </p>
                      </div>

                      {/* tags */}
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

            {/* dots */}
            <div className="mt-5 flex items-center gap-[7px]">
              {skills.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to skill ${i + 1}`}
                  className={cn(
                    "cursor-pointer rounded border-0 p-0 transition-all duration-300 h-[7px]",
                    i === current ? "w-[22px] bg-[#5b4fff]" : "w-[7px] bg-[#c5c2f7]",
                  )}
                />
              ))}

              {/* prev / next */}
              <div className="ml-auto flex gap-2">
                {(["←", "→"] as const).map((arrow, di) => (
                  <button
                    key={arrow}
                    onClick={() => goTo(current + (di === 0 ? -1 : 1))}
                    className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[10px] border border-[#c5c2f7] bg-white text-[15px] text-[#5b4fff] transition-colors duration-200 hover:bg-[#ede9ff]"
                  >
                    {arrow}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: avatar (25%) ───────────────────────────────────── */}
          <div
            ref={avatarRef}
            className="flex h-full min-h-[380px] items-center justify-center"
          >
            <img
              src="/images/ch-3.png"
              alt="Divyansh avatar"
              draggable={false}
              className="w-full max-w-[290px] select-none drop-shadow-[0_8px_32px_rgba(91,79,255,0.18)]"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
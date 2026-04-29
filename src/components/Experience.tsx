import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading AOS
      gsap.from(".exp-heading", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-heading",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Timeline line AOS with reset
      gsap.from(".timeline-line-inner", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".timeline-line",
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      });

      // Experience cards AOS with reset
      document.querySelectorAll(".exp-card").forEach((card) => {
        const isLeft = card.classList.contains("exp-left");
        gsap.from(card, {
          x: isLeft ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        });
      });

      // Timeline dots AOS
      document.querySelectorAll(".timeline-dot").forEach((dot) => {
        gsap.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: dot,
            start: "top 82%",
            toggleActions: "play reverse play reverse",
          },
        });
      });

      // Bullet items stagger AOS
      document.querySelectorAll(".exp-bullets").forEach((list) => {
        gsap.from(list.querySelectorAll("li"), {
          x: 20,
          opacity: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-padding">
      <div className="section-container">
        <div className="exp-heading text-center mb-10 sm:mb-12 lg:mb-16">
          <span className="section-label">Experience</span>
          <h2 className="section-heading">Professional Journey</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line — hidden on mobile */}
          <div className="timeline-line absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-border hidden lg:block">
            <div className="timeline-line-inner absolute inset-0 bg-primary" />
          </div>

          {resumeData.experience.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="relative mb-8 sm:mb-12 lg:grid lg:grid-cols-2 lg:gap-12">
                {/* Dot — hidden on mobile */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
                  <div className="timeline-dot timeline-dot-pulse" />
                </div>

                {/* Mobile dot — shown on mobile only */}
                <div className="lg:hidden flex items-center gap-3 mb-3">
                  <div className="timeline-dot timeline-dot-pulse" />
                  <span className="text-sm text-primary font-medium">{exp.dateRange}</span>
                </div>

                <div className={`exp-card ${isLeft ? "exp-left lg:pr-12 lg:text-right" : "exp-right lg:col-start-2 lg:pl-12"}`}>
                  <div className="card-elevated">
                    <span className="text-sm text-primary font-medium hidden lg:block">{exp.dateRange}</span>
                    <h3 className="text-lg sm:text-xl font-bold font-display text-foreground mt-1">{exp.role}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                      {exp.company} · {exp.location}
                    </p>
                    <ul className={`exp-bullets space-y-1.5 sm:space-y-2 ${isLeft ? "lg:text-right" : ""}`}>
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5 sm:mt-1 shrink-0">▸</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;

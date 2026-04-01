import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-line-inner", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: ".timeline-line", start: "top 80%", end: "bottom 60%", scrub: 1 },
      });

      document.querySelectorAll(".exp-card").forEach((card) => {
        const isLeft = card.classList.contains("exp-left");
        gsap.from(card, {
          x: isLeft ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 80%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-padding">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="section-label">Experience</span>
          <h2 className="section-heading">Professional Journey</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="timeline-line absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-border hidden lg:block">
            <div className="timeline-line-inner absolute inset-0 bg-primary" />
          </div>

          {resumeData.experience.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className={`relative mb-12 lg:grid lg:grid-cols-2 lg:gap-12`}>
                {/* Dot */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-6 z-10">
                  <div className="timeline-dot timeline-dot-pulse" />
                </div>

                <div className={`exp-card ${isLeft ? "exp-left lg:pr-12 lg:text-right" : "exp-right lg:col-start-2 lg:pl-12"}`}>
                  <div className="card-elevated">
                    <span className="text-sm text-primary font-medium">{exp.dateRange}</span>
                    <h3 className="text-xl font-bold font-display text-foreground mt-1">{exp.role}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {exp.company} · {exp.location}
                    </p>
                    <ul className={`space-y-2 ${isLeft ? "lg:text-right" : ""}`}>
                      {exp.bullets.map((b, j) => (
                        <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1 shrink-0">▸</span>
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

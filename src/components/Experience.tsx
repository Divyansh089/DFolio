import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";
import CertificateCard from "./ui/CertificateCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // AOS for heading
      gsap.from(".exp-heading", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".exp-heading",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });

      // Timeline line AOS
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

      // AOS for each experience card
      document.querySelectorAll(".exp-card-container").forEach((card) => {
        gsap.from(card, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none reset",
          },
        });
      });

      // AOS for bullet items
      document.querySelectorAll(".exp-bullets").forEach((ul) => {
        gsap.from(ul.querySelectorAll("li"), {
          x: -15,
          opacity: 0,
          duration: 0.3,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ul,
            start: "top 88%",
            toggleActions: "play none none reset",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="section-padding overflow-hidden">
      <div className="section-container">
        <div className="exp-heading text-center mb-10 sm:mb-16">
          <span className="section-label">Experience</span>
          <h2 className="section-heading font-display">Professional Journey</h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline line — hidden on mobile */}
          <div className="timeline-line absolute left-0 lg:left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-border hidden lg:block">
            <div className="timeline-line-inner absolute inset-0 bg-primary" />
          </div>

          <div className="space-y-12 lg:space-y-24">
            {resumeData.experience.map((exp, i) => {
              const isLeft = i % 2 === 0;
              const isInternship = exp.role.toLowerCase().includes("intern");
              const certificatePath = "/certificate/CertificateUnifiedMentor.pdf";
              
              return (
                <div key={i} className="exp-card-container relative">
                  {/* Glowing Timeline dot - Lowered to top-6 */}
                  <div className="absolute left-0 lg:left-1/2 top-6 lg:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-20 hidden lg:block shadow-[0_0_15px_rgba(59,130,246,0.6)]" />

                  <div className={`flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 items-start ${isLeft ? "" : "lg:flex-row-reverse"}`}>
                    {/* Text Content - Always Left Aligned as requested */}
                    <div className={`w-full lg:text-left ${isLeft ? "" : "lg:col-start-2"}`}>
                      {/* Mobile/Tablet Row: Text + Button side-by-side */}
                      <div className="flex items-start gap-4 flex-row text-left lg:block">
                        <div className="flex-1">
                          <span className="text-xs font-mono text-primary/60 lg:hidden mb-2 block">{exp.dateRange}</span>
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1 font-display text-left">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 mb-4 justify-start">
                            <span className="text-primary font-bold text-sm lg:text-base tracking-tight">{exp.company}</span>
                            <span className="hidden lg:inline text-muted-foreground/40 text-xs">•</span>
                            <span className="hidden lg:inline text-muted-foreground text-sm font-mono">{exp.dateRange}</span>
                          </div>
                          <ul className="exp-bullets space-y-3 mb-6">
                            {exp.bullets?.map((bullet, j) => (
                              <li key={j} className="text-sm lg:text-base text-muted-foreground leading-relaxed flex items-start gap-2 text-left">
                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/30 shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Mobile Play Button */}
                        {isInternship && (
                          <div className="lg:hidden shrink-0 mt-1">
                            <CertificateCard 
                              pdfUrl={certificatePath}
                              title={`${exp.role} Certificate`}
                              isLeft={false} 
                              onlyButton
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Desktop Placeholder */}
                    <div className={`hidden lg:flex lg:col-span-1 justify-center ${isLeft ? "lg:col-start-2" : "lg:col-start-1"}`}>
                      {isInternship ? (
                        <div className="w-full max-w-sm">
                          <CertificateCard 
                            pdfUrl={certificatePath}
                            title={`${exp.role} Certificate`}
                            isLeft={false} 
                          />
                        </div>
                      ) : (
                        <div className="w-full h-48 rounded-3xl border border-dashed border-border/50 bg-muted/5 flex items-center justify-center">
                          <span className="text-xs font-mono text-muted-foreground/30 uppercase tracking-widest">In Progress</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

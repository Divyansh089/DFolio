import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading AOS
      gsap.from(".cert-heading", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cert-heading",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Cert rows AOS with reset
      document.querySelectorAll(".cert-row").forEach((row, i) => {
        gsap.from(row, {
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        });
      });

      // Cert placeholders AOS
      document.querySelectorAll(".cert-placeholder").forEach((card) => {
        gsap.from(card, {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        });
      });

      // Org badges AOS
      document.querySelectorAll(".cert-org-badge").forEach((badge) => {
        gsap.from(badge, {
          y: 15,
          opacity: 0,
          duration: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: badge,
            start: "top 88%",
            toggleActions: "play reverse play reverse",
          },
        });
      });

      // Topic tags stagger
      document.querySelectorAll(".cert-tags").forEach((tagGroup) => {
        gsap.from(tagGroup.querySelectorAll(".tech-tag"), {
          y: 12,
          opacity: 0,
          duration: 0.35,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: tagGroup,
            start: "top 88%",
            toggleActions: "play reverse play reverse",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="section-padding bg-muted/30">
      <div className="section-container">
        <div className="cert-heading">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-0.5 bg-primary" />
            <span className="section-label mb-0">Certifications</span>
          </div>
          <h2 className="section-heading mb-8 sm:mb-12 lg:mb-16">
            What I've <span className="text-primary">Earned</span>
          </h2>
        </div>

        <div className="space-y-10 sm:space-y-12 lg:space-y-16 max-w-5xl mx-auto">
          {resumeData.certifications.map((cert, i) => {
            const isEven = i % 2 !== 0;
            const descriptions: Record<string, string> = {
              "Hyperledger Fabric Developer": "Enterprise blockchain development covering chaincode, endorsement policies, Fabric CA/PKI, Raft ordering service, SDKs, Docker and Kubernetes deployment.",
              "Full-Stack Web Development": "Comprehensive full-stack development with React, Node.js, REST APIs, and modern testing practices.",
              "Advanced Blockchain": "Deep dive into consensus mechanisms, token standards, and gas optimization techniques.",
              "Java (Basic)": "HackerRank certified assessment in Java fundamentals.",
              "Python (Basic)": "HackerRank certified assessment in Python fundamentals.",
            };
            const topicDescription = descriptions[cert.name] || cert.topics.join(", ");

            return (
              <div key={cert.name} className={`cert-row grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start`}>
                <div className={isEven ? "lg:order-2" : ""}>
                  {/* Organization badge */}
                  <span className="cert-org-badge inline-block px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 rounded-full mb-3 sm:mb-4">
                    {cert.organization}
                  </span>

                  {/* Cert name */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-foreground mb-2 leading-tight">
                    {cert.name}
                  </h3>

                  {/* Year */}
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 font-mono">
                    // {cert.year}
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-5">
                    {topicDescription}
                  </p>

                  {/* Topic tags */}
                  <div className="cert-tags flex flex-wrap gap-1.5 sm:gap-2">
                    {cert.topics.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Certificate placeholder card */}
                <div className={isEven ? "lg:order-1" : ""}>
                  <div className="cert-placeholder rounded-2xl sm:rounded-3xl border border-border bg-card h-48 sm:h-56 lg:h-64 flex flex-col items-center justify-center shadow-sm">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 mb-2 sm:mb-3 text-primary/30">
                      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="12" y="8" width="40" height="48" rx="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.08" />
                        <path d="M22 24h20M22 32h14M22 40h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M38 44l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="42" cy="48" r="6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
                      </svg>
                    </div>
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
                      Certificate Image
                    </span>
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

export default Certifications;

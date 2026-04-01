import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll(".cert-row").forEach((row, i) => {
        gsap.from(row, {
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="section-padding bg-muted/30">
      <div className="section-container">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-0.5 bg-primary" />
          <span className="section-label mb-0">Certifications</span>
        </div>
        <h2 className="section-heading mb-16">
          What I've <span className="text-primary">Earned</span>
        </h2>

        <div className="space-y-16 max-w-5xl mx-auto">
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
              <div key={cert.name} className={`cert-row grid lg:grid-cols-2 gap-10 items-start`}>
                <div className={isEven ? "lg:order-2" : ""}>
                  {/* Organization badge */}
                  <span className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 rounded-full mb-4">
                    {cert.organization}
                  </span>

                  {/* Cert name */}
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2 leading-tight">
                    {cert.name}
                  </h3>

                  {/* Year */}
                  <p className="text-sm text-muted-foreground mb-4 font-mono">
                    // {cert.year}
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    {topicDescription}
                  </p>

                  {/* Topic tags */}
                  <div className="flex flex-wrap gap-2">
                    {cert.topics.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                {/* Certificate placeholder card */}
                <div className={isEven ? "lg:order-1" : ""}>
                  <div className="rounded-3xl border border-border bg-card h-64 flex flex-col items-center justify-center shadow-sm">
                    <div className="w-14 h-14 mb-3 text-primary/30">
                      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="12" y="8" width="40" height="48" rx="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.08" />
                        <path d="M22 24h20M22 32h14M22 40h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M38 44l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="42" cy="48" r="6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
                      </svg>
                    </div>
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/50">
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

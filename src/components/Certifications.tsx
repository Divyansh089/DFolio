import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";
import CertificateCard from "./ui/CertificateCard";

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // AOS for heading
      gsap.from(".cert-heading", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cert-heading",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });

      // AOS for each certification row
      document.querySelectorAll(".cert-row").forEach((row) => {
        const title = row.querySelector(".cert-title");
        const details = row.querySelector(".cert-details");
        const placeholder = row.querySelector(".cert-placeholder");
        const topics = row.querySelectorAll(".cert-topic");

        // Title Animation
        gsap.from(title, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        });

        // Details/Description Animation
        gsap.from(details, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        });

        // Topics Stagger
        gsap.from(topics, {
          scale: 0.8,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          delay: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
        });

        // Placeholder Animation
        gsap.from(placeholder, {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: row,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { certifications } = resumeData;

  const getCertificatePdf = (name: string) => {
    const map: Record<string, string> = {
      "Hyperledger Fabric Developer": "/certificate/hyperledger-fabric-fundamentals.pdf",
      "Full-Stack Web Development": "/certificate/UC-Full-Stack.pdf",
      "Advanced Blockchain": "/certificate/UC-Adv-BlockChain.pdf",
      "Java (Basic)": "/certificate/java_basic certificate.pdf",
      "Python (Basic)": "/certificate/python_basic certificate.pdf",
    };
    return map[name] || null;
  };

  return (
    <section id="certifications" ref={sectionRef} className="section-padding bg-muted/30 overflow-hidden">
      <div className="section-container">
        <div className="cert-heading text-center mb-12 sm:mb-20">
          <span className="section-label">Certifications</span>
          <h2 className="section-heading font-display">Badges & Credentials</h2>
        </div>

        <div className="space-y-16 lg:space-y-32">
          {certifications.map((cert, index) => {
            const isEven = index % 2 === 0;
            const certificatePdf = getCertificatePdf(cert.name);

            return (
              <div key={index} className="cert-row relative group">
                <div className={`flex flex-col lg:grid lg:grid-cols-12 lg:gap-16 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}>
                  
                  {/* Info Content */}
                  <div className={`w-full lg:col-span-6 ${isEven ? "lg:text-left lg:order-1" : "lg:text-right lg:col-start-7 lg:order-2"}`}>
                    <div className={`flex items-start gap-6 ${isEven ? "flex-row-reverse text-right" : "flex-row text-left"} lg:flex lg:flex-col lg:gap-0 ${isEven ? "lg:text-left" : "lg:text-right"}`}>
                      <div className="cert-details flex-1 lg:w-full">
                        <div className={`flex items-center gap-2 mb-3 ${isEven ? "justify-end lg:justify-start" : "justify-start lg:justify-end"}`}>
                          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-2 py-1 rounded">
                            {cert.organization}
                          </span>
                          <span className="text-xs text-muted-foreground/50 font-mono">{cert.year}</span>
                        </div>
                        <h3 className="cert-title text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 font-display">
                          {cert.name}
                        </h3>
                        <div className={`flex flex-wrap gap-2 ${isEven ? "justify-end lg:justify-start" : "justify-start lg:justify-end"}`}>
                          {cert.topics?.map((t) => (
                            <span key={t} className="cert-topic px-3 py-1 bg-background border border-primary rounded-full text-[10px] sm:text-xs font-medium text-primary">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Mobile Play Button */}
                      {certificatePdf && (
                        <div className="lg:hidden shrink-0 mt-2">
                          <CertificateCard 
                            pdfUrl={certificatePdf}
                            title={cert.name}
                            isLeft={false} 
                            onlyButton
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Desktop Certificate Card - Reduced height/width */}
                  <div className={`cert-placeholder hidden lg:flex lg:col-span-5 justify-center w-full ${isEven ? "lg:col-start-8 lg:order-2" : "lg:col-start-1 lg:order-1"}`}>
                    {certificatePdf ? (
                      <div className="w-full max-w-sm">
                        <CertificateCard 
                          pdfUrl={certificatePdf}
                          title={cert.name}
                          isLeft={false} 
                        />
                      </div>
                    ) : (
                      <div className="w-full max-w-sm aspect-[1.414/1] rounded-3xl border border-dashed border-border/50 bg-muted/10 flex items-center justify-center">
                        <span className="text-xs font-mono text-muted-foreground/30 uppercase tracking-widest">Digital Badge</span>
                      </div>
                    )}
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

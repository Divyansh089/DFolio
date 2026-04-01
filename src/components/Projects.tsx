import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll(".project-row").forEach((row, i) => {
        const direction = i % 2 === 0 ? -60 : 60;
        gsap.from(row, {
          x: direction,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 80%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const filters = ["brightness(1.05)", "contrast(1.1) saturate(1.2)", "hue-rotate(20deg) brightness(1.05)"];

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-muted/30">
      <div className="section-container">
        <span className="section-label">Projects</span>
        <h2 className="section-heading mb-16">Featured Work</h2>

        <div className="space-y-20">
          {resumeData.projects.map((project, i) => {
            const isEven = i % 2 !== 0;
            return (
              <div
                key={project.name}
                className={`project-row grid lg:grid-cols-2 gap-12 items-center ${isEven ? "lg:direction-rtl" : ""}`}
              >
                <div className={`${isEven ? "lg:order-2" : ""}`}>
                  <span className="text-6xl font-bold text-primary/10 font-display">{project.number}</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-foreground -mt-4 mb-4">{project.name}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                      GitHub →
                    </a>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">
                      Live Demo →
                    </a>
                  </div>
                </div>
                <div className={`${isEven ? "lg:order-1" : ""}`}>
                  <img
                    src="/images/work-desk.jpg"
                    alt={project.name}
                    className="rounded-2xl w-full hover:scale-105 transition-transform duration-500"
                    style={{ filter: filters[i] }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;

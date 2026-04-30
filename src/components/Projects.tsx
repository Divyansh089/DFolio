import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // AOS for section heading
      gsap.from(".projects-heading", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-heading",
          start: "top 85%",
          toggleActions: "play none none reset",
        },
      });

      // AOS for each project row (alternating slide direction)
      document.querySelectorAll(".project-row").forEach((row, i) => {
        const direction = i % 2 === 0 ? -60 : 60;
        gsap.from(row, {
          x: direction,
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

      // AOS for project images (scale in)
      document.querySelectorAll(".project-image").forEach((img) => {
        gsap.from(img, {
          scale: 0.85,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: img,
            start: "top 82%",
            toggleActions: "play none none reset",
          },
        });
      });

      // AOS for tech tags (staggered per project)
      document.querySelectorAll(".project-tags").forEach((container) => {
        gsap.from(container.querySelectorAll(".tech-tag"), {
          y: 10,
          opacity: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 88%",
            toggleActions: "play none none reset",
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Map project images with custom assignments
  const getProjectImage = (index: number): string => {
    const imageMap: { [key: number]: number } = {
      0: 2,  // Project 1 → pro-2.png
      1: 1,  // Project 2 → pro-1.png
      2: 3,  // Project 3 → pro-3.png
    };
    return `/images/pro-${imageMap[index]}.png`;
  };

  return (
    <section id="projects" ref={sectionRef} className="section-padding bg-muted/30">
      <div className="section-container">
        <div className="projects-heading">
          <span className="section-label">Projects</span>
          <h2 className="section-heading mb-10 sm:mb-16">Featured Work</h2>
        </div>

        <div className="space-y-12 sm:space-y-20">
          {resumeData.projects.map((project, i) => {
            const isEven = i % 2 !== 0;
            return (
              <div
                key={project.name}
                className={`project-row grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center ${isEven ? "lg:direction-rtl" : ""}`}
              >
                <div className={`${isEven ? "lg:order-2" : ""}`}>
                  <span className="text-4xl sm:text-6xl font-bold text-primary/10 font-display">{project.number}</span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-foreground -mt-3 sm:-mt-4 mb-3 sm:mb-4">{project.name}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">{project.description}</p>
                  <div className="project-tags flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {project.techStack.map((t) => (
                      <span key={t} className="tech-tag">{t}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-xl border border-border bg-background px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-xl bg-primary px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-[0_4px_20px_-4px_hsl(234_85%_55%_/_0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 7v12h12" />
                      </svg>
                      <span>Live</span>
                    </a>
                  </div>
                </div>
                <div className={`project-image ${isEven ? "lg:order-1" : ""}`}>
                  <img
                    src={getProjectImage(i)}
                    alt={project.name}
                    className="rounded-2xl w-full hover:scale-105 transition-transform duration-500"
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

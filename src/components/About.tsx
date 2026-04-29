import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading AOS
      gsap.from(".about-heading", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-heading",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Image slide-in with reset
      gsap.from(".about-image", {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Text slide-in with reset
      gsap.from(".about-text", {
        x: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Paragraphs stagger
      gsap.from(".about-paragraph", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Stat counters with reset
      const statEls = statsRef.current?.querySelectorAll(".stat-value");
      statEls?.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-value") || "0");
        const isFloat = target % 1 !== 0;

        const tween = gsap.fromTo(
          el,
          { innerText: "0" },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: isFloat ? undefined : { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
            onUpdate: function () {
              const current = parseFloat(gsap.getProperty(el, "innerText") as string);
              el.textContent = isFloat ? current.toFixed(2) : Math.round(current).toString();
            },
          }
        );
      });

      // Stats cards fade-up
      gsap.from(".stat-card", {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { about } = resumeData;

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-muted/30">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="about-image lg:col-span-5 flex justify-center lg:justify-start">
            <div className="relative h-[280px] sm:h-[360px] md:h-[420px] lg:h-[480px] flex items-center">
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-primary/15" />
              <img
                src="/images/ch-8.png"
                alt="About Divyansh"
                className="relative w-56 sm:w-72 md:w-80 lg:w-[420px] rounded-2xl object-contain"
              />
            </div>
          </div>

          {/* Text */}
          <div className="about-text lg:col-span-7">
            <div className="about-heading">
              <span className="section-label font-semibold">About Me</span>
              <h2 className="section-heading mb-4 sm:mb-6">
                Passionate Developer &<br className="hidden sm:block" />Blockchain Enthusiast
              </h2>
            </div>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="about-paragraph text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
                {p}
              </p>
            ))}

            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
              {about.stats.map((stat) => (
                <div key={stat.label} className="stat-card text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary font-display">
                    <span className="stat-value" data-value={stat.value}>
                      0
                    </span>
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

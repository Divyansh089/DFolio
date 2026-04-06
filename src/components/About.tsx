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
      gsap.from(".about-image", {
        x: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-image", start: "top 80%" },
      });
      gsap.from(".about-text", {
        x: 80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-text", start: "top 80%" },
      });

      // Stat counters
      const statEls = statsRef.current?.querySelectorAll(".stat-value");
      statEls?.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-value") || "0");
        const isFloat = target % 1 !== 0;
        gsap.fromTo(
          el,
          { innerText: "0" },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: isFloat ? undefined : { innerText: 1 },
            scrollTrigger: { trigger: el, start: "top 85%" },
            onUpdate: function () {
              const current = parseFloat(gsap.getProperty(el, "innerText") as string);
              el.textContent = isFloat ? current.toFixed(2) : Math.round(current).toString();
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const { about } = resumeData;

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-muted/30">
      <div className="section-container grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Image */}
        <div className="about-image lg:col-span-5 flex justify-center lg:justify-start lg:-ml-8">
          <div className="relative h-[420px] md:h-[480px] flex items-center">
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-2xl bg-primary/15" />
            <img
              src="/images/ch-8.png"
              alt="About Divyansh"
              className="relative w-80 md:w-[420px] rounded-2xl object-contain"
            />
          </div>
        </div>

        {/* Text */}
        <div className="about-text lg:col-span-7">
          <span className="section-label font-semibold">About Me</span>
          <h2 className="section-heading mb-6">
            Passionate Developer &<br />Blockchain Enthusiast
          </h2>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-4">
              {p}
            </p>
          ))}

          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {about.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary font-display">
                  <span className="stat-value" data-value={stat.value}>
                    0
                  </span>
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

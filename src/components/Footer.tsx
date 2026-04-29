import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(".footer-links a", {
        y: 15,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.from(".footer-copyright", {
        opacity: 0,
        duration: 0.5,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 92%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="border-t border-border py-8 sm:py-10">
      <div className="section-container">
        <div className="footer-content flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between">
          <a href="#" className="font-display text-lg sm:text-xl font-bold text-primary">
            {resumeData.hero.name.split(" ")[0]}<span className="text-foreground">.</span>
          </a>

          <div className="footer-links flex flex-wrap justify-center gap-4 sm:gap-6">
            {resumeData.nav.map((link) => (
              <a key={link.href} href={link.href} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            {resumeData.hero.socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {s.platform}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-copyright text-center mt-6 sm:mt-8 text-[10px] sm:text-xs text-muted-foreground">
          © {new Date().getFullYear()} {resumeData.hero.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

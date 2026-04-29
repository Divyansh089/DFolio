import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading AOS
      gsap.from(".contact-heading", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Form side AOS with reset
      gsap.from(".contact-form", {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Image AOS with reset
      gsap.from(".contact-image", {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-image",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Contact info items stagger
      gsap.from(".contact-info-item", {
        x: -20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Form fields stagger
      gsap.from(".contact-field", {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form-fields",
          start: "top 85%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const { contact } = resumeData;

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-secondary/50">
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* Form side */}
        <div className="contact-form">
          <div className="contact-heading">
            <span className="section-label">Contact</span>
            <h2 className="section-heading mb-6 sm:mb-8">Let's Connect</h2>
          </div>

          <div className="contact-info space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            <div className="contact-info-item flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
              <span className="text-primary">📧</span> {contact.email}
            </div>
            <div className="contact-info-item flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
              <span className="text-primary">📱</span> {contact.phone}
            </div>
            <div className="contact-info-item flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
              <span className="text-primary">📍</span> {contact.location}
            </div>
            <div className="contact-info-item flex gap-4 mt-2">
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-primary hover:underline">GitHub</a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-primary hover:underline">LinkedIn</a>
            </div>
          </div>

          <form className="contact-form-fields space-y-3 sm:space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="contact-field w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="contact-field w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="contact-field w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <button type="submit" className="contact-field btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>

        {/* Image */}
        <div className="contact-image flex justify-center lg:justify-end">
          <img
            src="/images/ch-2.png"
            alt="Contact"
            className="w-48 sm:w-64 md:w-72 lg:w-96"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;

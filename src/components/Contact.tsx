import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resumeData } from "../data/resumeData";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-form", {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-form", start: "top 80%" },
      });
      gsap.from(".contact-image", {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".contact-image", start: "top 80%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const { contact } = resumeData;

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-secondary/50">
      <div className="section-container grid lg:grid-cols-2 gap-16 items-center">
        {/* Form side */}
        <div className="contact-form">
          <span className="section-label">Contact</span>
          <h2 className="section-heading mb-8">Let's Connect</h2>

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="text-primary">📧</span> {contact.email}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="text-primary">📱</span> {contact.phone}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="text-primary">📍</span> {contact.location}
            </div>
            <div className="flex gap-4 mt-2">
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">GitHub</a>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">LinkedIn</a>
            </div>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>

        {/* Image */}
        <div className="contact-image flex justify-center lg:justify-end">
          <img
            src="/images/ch-2.png"
            alt="Contact"
            className="w-72 md:w-96"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;

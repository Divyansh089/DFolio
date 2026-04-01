import { resumeData } from "../data/resumeData";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <a href="#" className="font-display text-xl font-bold text-primary">
            {resumeData.hero.name.split(" ")[0]}<span className="text-foreground">.</span>
          </a>

          <div className="flex flex-wrap gap-6">
            {resumeData.nav.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
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
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {s.platform}
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {resumeData.hero.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

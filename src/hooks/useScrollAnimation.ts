import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger: string;
  animation: gsap.TweenVars;
  start?: string;
  stagger?: number;
  targets?: string;
}

export const useScrollAnimation = (
  options: ScrollAnimationOptions[],
  deps: unknown[] = []
) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      options.forEach(({ trigger, animation, start = "top 80%", stagger, targets }) => {
        const elements = targets
          ? document.querySelectorAll(targets)
          : [document.querySelector(trigger)];

        if (stagger && targets) {
          gsap.from(targets, {
            ...animation,
            stagger,
            scrollTrigger: {
              trigger,
              start,
              // Reset: play on scroll-down, reverse on scroll-up
              toggleActions: "play reverse play reverse",
            },
          });
        } else {
          elements.forEach((el) => {
            if (!el) return;
            gsap.from(el, {
              ...animation,
              scrollTrigger: {
                trigger: el,
                start,
                // Reset: play on scroll-down, reverse on scroll-up
                toggleActions: "play reverse play reverse",
              },
            });
          });
        }
      });
    });

    return () => ctx.revert();
  }, deps);
};

export default useScrollAnimation;

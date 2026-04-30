import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger: string;
  animation: gsap.TweenVars;
  start?: string;
  end?: string;
  stagger?: number;
  targets?: string;
}

/**
 * Hook that creates scroll-triggered GSAP animations with a RESET mechanism.
 *
 * toggleActions: "play reverse play reverse"
 *   → play on enter ↓, reverse on leave ↑, play on re-enter ↓, reverse on re-leave ↑
 *
 * This gives the user the effect of:
 *   scroll down  → animation plays
 *   scroll up    → animation reverses (resets)
 *   scroll down  → animation plays again
 */
export const useScrollAnimation = (
  options: ScrollAnimationOptions[],
  deps: unknown[] = []
) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      options.forEach(({ trigger, animation, start = "top 80%", end, stagger, targets }) => {
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
              end: end || undefined,
              toggleActions: "play none none reset",
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
                end: end || undefined,
                toggleActions: "play none none reset",
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

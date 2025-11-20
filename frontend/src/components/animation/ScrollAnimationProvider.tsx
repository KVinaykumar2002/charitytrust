"use client";

import { useEffect } from "react";

type AnimationElement = HTMLElement & {
  dataset: {
    animation?: string;
    animationDelay?: string;
    animationDuration?: string;
    animationOnce?: string;
    parallaxSpeed?: string;
    textAnimation?: string;
    textOriginal?: string;
    magneticStrength?: string;
  };
};

const ANIMATION_SELECTOR = "[data-animation]";
const TEXT_ANIMATION_SELECTOR = "[data-text-animation]";
const STAGGER_PARENT_SELECTOR = "[data-stagger-parent]";
const PARALLAX_SELECTOR = "[data-parallax]";
const MAGNETIC_SELECTOR = "[data-hover='magnetic']";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

const ScrollAnimationProvider = () => {
  useEffect(() => {
    const animatedElements = new Set<AnimationElement>();

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (!(entry.target instanceof HTMLElement)) return;
        const element = entry.target as AnimationElement;
        const { isIntersecting } = entry;

        if (isIntersecting) {
          if (element.dataset.animationDelay) {
            element.style.setProperty(
              "--animation-delay",
              element.dataset.animationDelay
            );
          }
          if (element.dataset.animationDuration) {
            element.style.setProperty(
              "--animation-duration",
              element.dataset.animationDuration
            );
          }

          window.requestAnimationFrame(() => {
            element.classList.add("is-visible");
          });

          if (element.dataset.textAnimation === "text-scramble") {
            runTextScramble(element);
          }

          if (element.dataset.animationOnce !== "false") {
            observer.unobserve(element);
            animatedElements.delete(element);
          }
        } else if (element.dataset.animationOnce === "false") {
          element.classList.remove("is-visible");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    });

    const registerElement = (element: AnimationElement) => {
      if (animatedElements.has(element)) return;
      animatedElements.add(element);
      if (!element.classList.contains("is-anim-ready")) {
        element.classList.add("is-anim-ready");
      }
      observer.observe(element);
    };

    const scanAnimatedElements = (root: ParentNode | Document = document) => {
      root.querySelectorAll<AnimationElement>(ANIMATION_SELECTOR).forEach(
        registerElement
      );
    };

    scanAnimatedElements();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement || node instanceof DocumentFragment) {
            scanAnimatedElements(node);
            registerStaggerGroups(node);
            registerTextAnimations(node);
            registerParallaxElements(node);
            registerMagneticTargets(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    registerStaggerGroups();
    registerTextAnimations();
    registerParallaxElements();
    registerMagneticTargets();

    const handleScroll = () => {
      parallaxElements.forEach(({ element, speed }) => {
        const rect = element.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
        const translateY = -(offset * speed);
        element.style.setProperty(
          "--parallax-translate",
          `${translateY.toFixed(2)}px`
        );
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      magneticTargets.forEach(({ element, strength }) => {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        element.style.setProperty(
          "--magnetic-x",
          `${(x / strength).toFixed(2)}px`
        );
        element.style.setProperty(
          "--magnetic-y",
          `${(y / strength).toFixed(2)}px`
        );
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    handleScroll();

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return null;
};

const parallaxElements = new Set<{
  element: HTMLElement;
  speed: number;
}>();

const magneticTargets = new Set<{
  element: HTMLElement;
  strength: number;
}>();

const registerParallaxElements = (root: ParentNode | Document = document) => {
  root.querySelectorAll<HTMLElement>(PARALLAX_SELECTOR).forEach((element) => {
    if (Array.from(parallaxElements).some((item) => item.element === element)) {
      return;
    }
    const speed = parseFloat(element.dataset.parallaxSpeed || "0.2");
    element.classList.add("is-parallax-ready");
    parallaxElements.add({ element, speed });
  });
};

const registerMagneticTargets = (
  root: ParentNode | Document = document
) => {
  root.querySelectorAll<HTMLElement>(MAGNETIC_SELECTOR).forEach((element) => {
    if (Array.from(magneticTargets).some((item) => item.element === element)) {
      return;
    }
    const strength = parseFloat(
      element.dataset.magneticStrength || "8"
    );
    element.classList.add("is-magnetic-ready");
    element.addEventListener("mouseleave", () => {
      element.style.setProperty("--magnetic-x", "0px");
      element.style.setProperty("--magnetic-y", "0px");
    });
    magneticTargets.add({ element, strength });
  });
};

const registerStaggerGroups = (root: ParentNode | Document = document) => {
  root.querySelectorAll<HTMLElement>(STAGGER_PARENT_SELECTOR).forEach(
    (parent) => {
      const items = Array.from(
        parent.querySelectorAll<HTMLElement>("[data-stagger-item]")
      );
      const baseDelay = parseFloat(
        parent.dataset.staggerDelay || "0.08"
      );
      const baseDuration = parent.dataset.staggerDuration;

      items.forEach((item, index) => {
        item.dataset.animationDelay =
          item.dataset.animationDelay ||
          `${(index * baseDelay).toFixed(2)}s`;
        if (baseDuration && !item.dataset.animationDuration) {
          item.dataset.animationDuration = baseDuration;
        }
        item.style.setProperty("--stagger-index", index.toString());
      });
    }
  );
};

const registerTextAnimations = (root: ParentNode | Document = document) => {
  root.querySelectorAll<HTMLElement>(TEXT_ANIMATION_SELECTOR).forEach(
    (element) => {
      if (!element.dataset.textAnimation) {
        return;
      }
      if (!element.dataset.textOriginal) {
        element.dataset.textOriginal = element.textContent || "";
      }
    }
  );
};

const runTextScramble = (element: AnimationElement) => {
  const original = element.dataset.textOriginal || element.textContent || "";
  if (!original) return;
  let frame = 0;
  const totalFrames = 36;
  const randomChars = original.split("").map(() => ({
    char: "",
    endFrame: Math.floor(Math.random() * totalFrames),
  }));

  const update = () => {
    const output = original
      .split("")
      .map((char, index) => {
        const data = randomChars[index];
        if (frame >= data.endFrame) {
          return char;
        }
        if (char === " ") {
          return " ";
        }
        return SCRAMBLE_CHARS[
          Math.floor(Math.random() * SCRAMBLE_CHARS.length)
        ];
      })
      .join("");

    element.textContent = output;
    frame += 1;

    if (frame <= totalFrames) {
      requestAnimationFrame(update);
    } else {
      element.textContent = original;
    }
  };

  requestAnimationFrame(update);
};

export default ScrollAnimationProvider;


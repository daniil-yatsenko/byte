import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const footerInit = (page = document) => {
  const trigger = page.querySelector(".footer_social");
  const footer = page.querySelector(".footer_footer");

  if (!footer || !trigger) return;

  const b = footer.querySelector(".footer_logo-letter-wrapper.is-b");
  const y = footer.querySelector(".footer_logo-letter-wrapper.is-y");
  const t = footer.querySelector(".footer_logo-letter-wrapper.is-t");
  const e = footer.querySelector(".footer_logo-letter-wrapper.is-e");

  gsap.registerPlugin(ScrollTrigger);
  // gsap.set(footer, { opacity: 0.2 });
  gsap.set(b, { y: "-130%" });
  gsap.set(y, { y: "-100%" });
  gsap.set(t, { y: "-140%" });
  gsap.set(e, { y: "-150%" });

  const footerTl = gsap.timeline();
  // footerTl.to(footer, { opacity: 1, ease: "power1.out" });
  footerTl.to([b, y, t, e], { y: "0%", ease: "power2.out" });

  ScrollTrigger.create({
    trigger,
    start: "bottom bottom",
    end: `bottom bottom-=${footer.offsetHeight}`,
    animation: footerTl,
    scrub: true,
  });

  const handleMouseMove = (f) => {
    const rect = footer.getBoundingClientRect();

    const strength = 70;
    const offsetX =
      ((f.clientX - rect.left) / footer.offsetWidth - 0.5) * (strength / 16);
    const offsetY =
      ((f.clientY - rect.top) / footer.offsetHeight - 0.5) * (strength / 16);

    const b2 = b.querySelector(".footer_logo-letter");
    const y2 = y.querySelector(".footer_logo-letter");
    const t2 = t.querySelector(".footer_logo-letter");
    const e2 = e.querySelector(".footer_logo-letter");

    if (b && b2) {
      gsap.to(b2, {
        x: offsetX + "em",
        y: offsetY + "em",
        ease: "power4.out",
        duration: 1.6,
      });
    }

    if (y && y2) {
      gsap.to(y2, {
        x: offsetX + "em",
        y: offsetY + "em",
        ease: "power4.out",
        duration: 1.6,
      });
    }

    if (t && t2) {
      gsap.to(t2, {
        x: offsetX + "em",
        y: offsetY + "em",
        ease: "power4.out",
        duration: 1.6,
      });
    }

    if (e && e2) {
      gsap.to(e2, {
        x: offsetX + "em",
        y: offsetY + "em",
        ease: "power4.out",
        duration: 1.6,
      });
    }
  };

  footer.addEventListener("mousemove", handleMouseMove);
};

export { footerInit };

import { gsap } from "gsap";

const linksHoverInit = (page) => {
  if (window.innerWidth < 992) return;

  const links = page.querySelectorAll("a:not([data-no-animation])");

  links.forEach((link) => {
    const firstChar = document.createElement("div");
    firstChar.textContent = "[";
    gsap.set(firstChar, {
      position: "absolute",
      top: 0,
      left: "-0.6ch",
    });

    const lastChar = document.createElement("div");
    lastChar.textContent = "]";
    gsap.set(lastChar, {
      position: "absolute",
      top: 0,
      right: "-0.6ch",
    });

    gsap.set(link, { position: "relative" });

    link.addEventListener("mouseenter", () => {
      link.appendChild(firstChar);
      link.appendChild(lastChar);
    });

    link.addEventListener("mouseleave", () => {
      link.removeChild(firstChar);
      link.removeChild(lastChar);
    });
  });
};

export { linksHoverInit };

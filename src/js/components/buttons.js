import { gsap } from "gsap";

const buttonsInit = (page = document) => {
  const buttons = page
    .querySelector(".section_menu")
    .querySelectorAll(".menu_button:not([data-no-animation])");

  buttons.forEach((button) => {
    const firstChar = document.createElement("div");
    firstChar.textContent = "[";
    firstChar.classList.add("heading-style-h2");
    firstChar.classList.add("text-color-alternate");

    const lastChar = document.createElement("div");
    lastChar.textContent = "]";
    lastChar.classList.add("heading-style-h2");
    lastChar.classList.add("text-color-alternate");

    const arrow = button.querySelector(".menu_button-arrow");
    const arrowTl = gsap.timeline({ paused: true });
    arrowTl.to(arrow, { x: "-0.7rem", duration: 0.25 });
    arrowTl.to(arrow, { x: "0rem", duration: 0.25, ease: "bounce.out" });

    button.addEventListener("mouseenter", () => {
      if (window.innerWidth > 991) {
        button.prepend(firstChar);
        button.appendChild(lastChar);
        arrowTl.restart();
      }
    });

    button.addEventListener("mouseleave", () => {
      if (window.innerWidth > 991) {
        button.removeChild(firstChar);
        button.removeChild(lastChar);
      }
    });
  });
};

export { buttonsInit };

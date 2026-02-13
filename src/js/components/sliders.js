import "@splidejs/splide/css/core";
import Splide from "@splidejs/splide";
import { Intersection } from "@splidejs/splide-extension-intersection";
import { gsap } from "gsap";

const ease = "cubic-bezier(.77, 0, .175, 1)";

const splideConfig = {
  // default: {
  //   pagination: false,
  //   arrows: false,
  //   easing: ease,
  // },
  default: {
    type: "loop",
    perMove: 1,
    pagination: false,
    arrows: true,
    easing: ease,
    autoplay: true,
    speed: 700,
    interval: 3000,
    autoplay: "pause",
    intersection: {
      inView: {
        autoplay: true,
      },
      outView: {
        autoplay: false,
      },
    },
  },
  our_story: {
    perPage: 1,
  },
  menu: {
    type: "slide",
    rewind: "true",
    perPage: 1,
    pagination: true, //css with opacity 0 is in WF's "Global Styles"
  },
  gallery: {
    perPage: 2,
    breakpoints: {
      480: {
        perPage: 1,
      },
    },
  },
};

const createBracket = (text, className, side) => {
  const el = document.createElement("div");
  el.classList.add(className);
  el.textContent = text;
  gsap.set(el, { position: "absolute", top: 0, [side]: "-0.6ch" });
  return el;
};

const setMenuBtnActive = (btn) => {
  btn.classList.add("is-active");
  gsap.set(btn, { position: "relative" });
  btn.prepend(createBracket("[", "first-char", "left"));
  btn.appendChild(createBracket("]", "last-char", "right"));
};

const setMenuBtnInactive = (btn) => {
  btn.classList.remove("is-active");
  btn.querySelector(".first-char")?.remove();
  btn.querySelector(".last-char")?.remove();
};

const findMenuBtn = (menuBtns, id) =>
  [...menuBtns].find((btn) => btn.getAttribute("data-menu-item-id") === id);

const createSlideObserver = (menuBtns) =>
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName !== "class") continue;

      const target = mutation.target;
      const id = target.getAttribute("data-menu-item-id");
      const hasActive = target.classList.contains("is-active");
      const hadActive = (mutation.oldValue || "").includes("is-active");

      if (hasActive && !hadActive) {
        const prev = [...menuBtns].find((btn) =>
          btn.classList.contains("is-active"),
        );
        if (prev) setMenuBtnInactive(prev);

        const btn = findMenuBtn(menuBtns, id);
        if (btn) setMenuBtnActive(btn);
      } else if (!hasActive && hadActive) {
        const btn = findMenuBtn(menuBtns, id);
        if (btn?.classList.contains("is-active")) setMenuBtnInactive(btn);
      }
    }
  });

// menu functionality
const menuInit = (page = document) => {
  const menu = page.querySelector(".splide[data-splide-menu]");
  if (!menu) return;

  const menuBtns = menu.querySelectorAll(".menu_menu-group_item-name");
  if (!menuBtns) return;
  setMenuBtnActive(menuBtns[0]);

  const splideBtns = menu.querySelectorAll(".splide__pagination__page");
  const slides = menu.querySelectorAll(
    ".splide__slide:not(.splide__slide--clone)",
  );
  const slidesDict = {};
  const observer = createSlideObserver(menuBtns);

  slides.forEach((slide, index) => {
    const id = slide.getAttribute("data-menu-item-id");
    slidesDict[id] = index;
    observer.observe(slide, { attributes: true, attributeOldValue: true });
  });

  // menu item clicking functionality
  menuBtns.forEach((menuBtn) => {
    const id = menuBtn.getAttribute("data-menu-item-id");

    menuBtn.addEventListener("click", () => {
      splideBtns[slidesDict[id]].click();
    });

    menuBtn.addEventListener("mouseenter", () => {
      if (menuBtn.classList.contains("is-active")) return;
      setMenuBtnActive(menuBtn);
    });

    menuBtn.addEventListener("mouseleave", () => {
      if (slides[slidesDict[id]].classList.contains("is-active")) return;
      setMenuBtnInactive(menuBtn);
    });
  });
};

const splideInit = (page = document) => {
  const sliders = page.querySelectorAll(".splide");

  if (!sliders) return;

  sliders.forEach((slider) => {
    if (!slider.querySelector(".splide__track")) return;
    if (!slider.querySelector(".splide__list")) return;

    let config = splideConfig.default;

    if (slider.hasAttribute("data-splide-our-story")) {
      config = { ...splideConfig.default, ...splideConfig.our_story };
    }

    if (slider.hasAttribute("data-splide-menu")) {
      config = { ...splideConfig.default, ...splideConfig.menu };
    }

    if (slider.hasAttribute("data-splide-gallery")) {
      config = { ...splideConfig.default, ...splideConfig.gallery };
    }

    let splide = new Splide(slider, config);

    if (slider.hasAttribute("data-splide-menu")) {
      splide.on("pagination:mounted", () => {
        menuInit();
      });
    }

    splide.mount({ Intersection });
  });
};

export { splideInit };

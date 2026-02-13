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
    arrows: false,
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

const itemStyleActive = (item) => {
  const firstChar = document.createElement("div");
  firstChar.classList.add("first-char");
  firstChar.textContent = "[";
  gsap.set(firstChar, {
    position: "absolute",
    top: 0,
    left: "-0.6ch",
  });

  const lastChar = document.createElement("div");
  lastChar.classList.add("last-char");
  lastChar.textContent = "]";
  gsap.set(lastChar, {
    position: "absolute",
    top: 0,
    right: "-0.6ch",
  });

  gsap.set(item, { position: "relative" });

  item.appendChild(firstChar);
  item.appendChild(lastChar);
};

const itemStyleInactive = (item) => {
  const firstChar = item.querySelector(".first-char");
  const lastChar = item.querySelector(".last-char");
  if (firstChar) item.removeChild(firstChar);
  if (lastChar) item.removeChild(lastChar);
};

// observer for active slides
let menuBtnsRef = null;
const observer = new MutationObserver((mutations) => {
  const menuBtns = menuBtnsRef;
  mutations.forEach((mutation) => {
    if (mutation.attributeName === "class") {
      const target = mutation.target;
      const id = target.getAttribute("data-menu-item-id");
      const hasActive = target.classList.contains("is-active");
      const oldClass = mutation.oldValue || "";
      const hadActive = oldClass.includes("is-active");
      if (hasActive && !hadActive) {
        console.log(`Slide ${id}: .is-active added`);

        const prevMenuBtn = [...menuBtns].find((btn) =>
          btn.classList.contains("is-active"),
        );
        if (prevMenuBtn) {
          prevMenuBtn.classList.remove("is-active");
          itemStyleInactive(prevMenuBtn);
        }

        const activeMenuBtn = [...menuBtns].find(
          (btn) => btn.getAttribute("data-menu-item-id") === id,
        );
        if (activeMenuBtn) {
          activeMenuBtn.classList.add("is-active");
          itemStyleActive(activeMenuBtn);
        }
      } else if (!hasActive && hadActive) {
        console.log(`Slide ${id}: .is-active removed`);
        const matchingMenuBtn = [...menuBtns].find(
          (btn) => btn.getAttribute("data-menu-item-id") === id,
        );
        if (
          matchingMenuBtn &&
          matchingMenuBtn.classList.contains("is-active")
        ) {
          matchingMenuBtn.classList.remove("is-active");
          itemStyleInactive(matchingMenuBtn);
        }
      }
    }
  });
});

// menu functionality
const menuInit = (page = document) => {
  const menu = page.querySelector(".splide[data-splide-menu]");
  if (!menu) return;

  const menuBtns = menu.querySelectorAll(".menu_menu-group_item-name");
  menuBtnsRef = menuBtns;
  const splideBtns = menu.querySelectorAll(".splide__pagination__page");
  const slides = menu.querySelectorAll(
    ".splide__slide:not(.splide__slide--clone)",
  );
  const slidesDict = {};

  slides.forEach((slide, index) => {
    const id = slide.getAttribute("data-menu-item-id");
    // match slide id with its order
    slidesDict[id] = index;

    // observer to link active slide to menu item
    observer.observe(slide, { attributes: true, attributeOldValue: true });
  });

  // menu item clicking functionality
  menuBtns.forEach((menuBtn) => {
    const id = menuBtn.getAttribute("data-menu-item-id");

    menuBtn.addEventListener("click", () => {
      splideBtns[slidesDict[id]].click();
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
    splide.mount({ Intersection });
  });
  // rewrite on pagination mount for menu
  menuInit();
};

export { splideInit };

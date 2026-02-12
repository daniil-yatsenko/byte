import "@splidejs/splide/css/core";
import Splide from "@splidejs/splide";
import { Intersection } from "@splidejs/splide-extension-intersection";

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
  gallery: {
    perPage: 2,
    breakpoints: {
      480: {
        perPage: 1,
      },
    },
  },
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

    if (slider.hasAttribute("data-splide-gallery")) {
      config = { ...splideConfig.default, ...splideConfig.gallery };
    }

    let splide = new Splide(slider, config);
    splide.mount({ Intersection });
  });
};

export { splideInit };

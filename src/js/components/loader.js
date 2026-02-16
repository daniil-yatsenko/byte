import gsap from "gsap";
import { lenisMain } from "../global/globalInit";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const loaderInit = (page = document) => {
  const overlayParent = page.querySelector(".overlay_parent");
  const overlay = overlayParent.querySelector(".overlay_overlay");

  const tl = gsap.timeline();
  tl.to(overlay, {
    y: "-100%",
    duration: 0.5,
    ease: "expo.inOut",
    display: "none",
    onComplete: () => {
      lenisMain.resize();
      ScrollTrigger.refresh();
    },
    delay: 0.2,
  });
  tl.set(overlayParent, { display: "none" });
};

export { loaderInit };

import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

const taglinesInit = (page = document) => {
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);
  gsap.registerPlugin(ScrambleTextPlugin);

  const taglines = page.querySelectorAll("[data-tagline]");

  taglines.forEach((tagline) => {
    let text = tagline.textContent;
    const textLength = text.length;
    const firstChar = text[0];
    const lastChar = text[text.length - 1];
    const taglineSpan = document.createElement("span");
    tagline.isActivated = false;

    text = text.slice(1, -1);
    tagline.textContent = "";

    const tl = gsap.timeline({ paused: true });

    tl.add(() => {
      if (!tagline.isActivated) {
        tagline.append(firstChar);
        tagline.append(taglineSpan);
        tagline.append(lastChar);
        tagline.isActivated = true;
      }
    });

    tl.to(taglineSpan, {
      duration: textLength / 25,
      ease: "power2.inOut",
      scrambleText: {
        text: text,
        chars: " ",
      },
    });

    ScrollTrigger.create({
      trigger: tagline,
      start: `bottom bottom 90%`,
      onEnter: () => {
        tl.play();
      },
      onLeaveBack: () => {
        tl.reverse();
      },
    });

    // gsap.from(split.words, {
    //   opacity: 0,
    //   stagger: 0.15,
    //   ease: "power2.inOut",
    //   scrollTrigger: {
    //     trigger: tagline,
    //     start: "top 80%",
    //     end: "bottom 20%",
    //   },
    // });
  });
};

export { taglinesInit };

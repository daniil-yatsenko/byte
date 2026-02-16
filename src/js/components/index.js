// import { exampleComponent } from "./exampleComponent.js";
import { taglinesInit } from "./taglines.js";
import { linksHoverInit } from "./links.js";
import { splideInit } from "./sliders.js";
import { buttonsInit } from "./buttons.js";
import { footerInit } from "./footer.js";
import { loaderInit } from "./loader.js";

export const componentsInit = (page = document) => {
  loaderInit(page);
  taglinesInit(page);
  linksHoverInit(page);
  splideInit(page);
  buttonsInit(page);
  footerInit(page);
  console.log("components init");
};

// needed only with Barba.js
export const componentsCleanup = (page = document) => {
  console.log("components cleanup");
};

// import { exampleComponent } from "./exampleComponent.js";
import { taglinesInit } from "./taglines.js";

export const componentsInit = (page = document) => {
  taglinesInit(document);
  console.log("components init");
};

// needed only with Barba.js
export const componentsCleanup = (page = document) => {
  console.log("components cleanup");
};

import { highlights } from "../data/colors";

export const getHighlights = (target) => {
  for (let i = 0; i < highlights.length; i++) {
    const cool = highlights[i];
    if (cool.color == target) {
      return cool.code;
    }
  }

  return "text-neutral-600";
};

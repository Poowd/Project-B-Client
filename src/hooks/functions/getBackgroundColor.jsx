import { backgroundcolors } from "../data/colors";

export const getBackgroundColor = (target) => {
  for (let i = 0; i < backgroundcolors.length; i++) {
    const cool = backgroundcolors[i];
    if (cool.color == target) {
      return cool.code;
    }
  }

  return "text-neutral-600";
};

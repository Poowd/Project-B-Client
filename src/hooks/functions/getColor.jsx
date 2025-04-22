import { colors } from "../data/colors";

export const getColor = (target) => {
  for (let i = 0; i < colors.length; i++) {
    const cool = colors[i];
    if (cool.color == target) {
      return cool.code;
    }
  }

  return "text-neutral-600";
};

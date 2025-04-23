import { getColor } from "./getColor";

export const getPetColor = (type, array) => {
  const category = array.filter((category) => category[1] === type);

  if (category) {
    getColor(category[0][3]);
  }

  return getColor("dark_gray");
};

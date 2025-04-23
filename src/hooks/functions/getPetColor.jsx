import { getColor } from "./getColor";

export const getPetColor = (type, array) => {
  const category = array.filter((category) => category[1] === type);

  return getColor(category[0][3]);
};

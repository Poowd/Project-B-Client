import { getBackgroundColor } from "./getBackgroundColor";

export const getPetBackgroundColor = (type, array) => {
  const category = array.filter((category) => category[1] === type);

  return getBackgroundColor(category[0][3]);
};

import { getHighlights } from "./getHighlights";

export const getPetHighlights = (type, array) => {
  const category = array.filter((category) => category[1] === type);

  return getHighlights(category[0][3]);
};

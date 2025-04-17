import { useState } from "react";

export default function useGetImage() {
  const [image, setImage] = useState(null);

  const getImage = async (id) => {
    try {
      const response = await fetch(`/../api/get_image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID: id,
        }),
      });

      // Parse the response content
      const petch = await response.json();

      return setImage(petch.data);
    } catch (error) {
      console.log(error);
    }
  };

  return [image, getImage];
}

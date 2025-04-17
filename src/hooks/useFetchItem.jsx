import { useState } from "react";

export default function useFetchItem(api) {
  const [data, setData] = useState(null);
  const [size, setSize] = useState(0);
  const [pending, setPending] = useState(false);

  async function getList(id) {
    setPending(true);
    try {
      const response = await fetch(`/../api/${api}`, {
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
      setSize(petch.data.length);
      return setData(petch.data);
    } catch (error) {
      console.log(error);
    }
  }

  return [data, size, pending, getList];
}

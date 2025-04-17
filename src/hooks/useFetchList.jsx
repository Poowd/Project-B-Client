import { useEffect, useState } from "react";

export default function useFetchList(api) {
  const [data, setData] = useState(null);
  const [size, setSize] = useState(0);
  const [pending, setPending] = useState(false);

  async function getList(min, max) {
    setPending(true);
    try {
      const response = await fetch(`/../api/${api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MIN: min,
          MAX: max - 2,
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

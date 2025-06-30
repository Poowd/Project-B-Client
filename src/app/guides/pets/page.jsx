"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState(null);

  const load_data = async () => {
    try {
      const response = await fetch(`../../api/v1/pet_data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const fetchData = await response.json();
      setData(fetchData.pets);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    load_data();
  }, []);

  return (
    <main className="w-[90%] lg:w-[68%] mx-auto py-20">
      {!data && (
        <main className="h-20 w-full bg-neutral-900 rounded-2xl flex justify-center items-center">
          <p>Fetching Pets...</p>
        </main>
      )}
      {data && (
        <section className="w-full grid grid-cols-5 gap-5">
          {data.map((item, i) => (
            <Link
              key={i}
              href={{
                pathname: `/guides/pets/${item.id}`,
                query: { data: JSON.stringify(item) },
              }}
              className="w-full"
            >
              <figure className="w-full flex justify-center items-center aspect-square rounded-2xl bg-neutral-900 hover:scale-105 delay-75 duration-150 ease-in-out mb-2.5">
                <img src={item.image} className="size-32"></img>
              </figure>
              <p className="text-center">{item.name}</p>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}

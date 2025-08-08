"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [petList, setPetList] = useState(null);

  const load_data = async () => {
    try {
      const response = await fetch(`../../api/e0/get_all_pets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const fetchData = await response.json();
      setPetList(fetchData.data);
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
      {!petList && (
        <p className="text-neutral-700 bg-neutral-900 p-5 rounded-2xl">
          Fetching Pets...
        </p>
      )}
      {petList && (
        <section className="w-full grid grid-cols-5 gap-5">
          {petList.map((item, i) => (
            <Link
              key={i}
              href={{
                pathname: `/guides/pets/${item.PETID}`,
                query: { data: JSON.stringify(item) },
              }}
              className="w-full"
            >
              <figure className="w-full flex justify-center items-center aspect-square rounded-2xl bg-neutral-900 hover:scale-105 delay-75 duration-150 ease-in-out mb-2.5">
                <img src={item.Image} className="size-32"></img>
              </figure>
              <p className="text-center">{item.Name}</p>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}

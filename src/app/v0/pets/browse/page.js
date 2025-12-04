"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { imageUrl } from "../../../config";

export default function Page() {
  const [petList, setPetList] = useState(null);

  const loadData = async () => {
    try {
      const response = await fetch(`../../../api/e0/browsePets`, {
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
    loadData();
  }, []);

  return (
    <main className="size-full p-10">
      <header className="w-full mb-5 border-b border-neutral-800 flex gap-10 pb-2">
        <div className="flex-1">
          <p className={`mb-2.5`}>Meet the</p>
          <h1 className={`text-4xl font-bold mb-2.5`}>Cubiods!</h1>
          <h3 className="text-xl"></h3>
        </div>
      </header>
      <section className="w-full mb-5">
        {!petList || (petList.length === 0 && <div>No pets found.</div>)}
        {!petList && <div>Loading...</div>}
        {petList && (
          <section className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-5">
            {petList
              .sort((a, b) => a.Name.localeCompare(b.Name))
              .map((item, i) => (
                <Link
                  key={i}
                  href={{
                    pathname: `/v0/pets/browse/${item.PETID}`,
                    query: { data: JSON.stringify(item) },
                  }}
                  className="w-full"
                >
                  <figure className="w-full flex justify-center items-center aspect-square rounded-2xl bg-neutral-900 hover:scale-105 delay-75 duration-150 ease-in-out mb-2.5">
                    <img
                      src={imageUrl.concat(item.Image)}
                      className="size-20 lg:size-[75%]"
                    ></img>
                  </figure>
                  <p className="text-center">{item.Name}</p>
                </Link>
              ))}
          </section>
        )}
      </section>
    </main>
  );
}

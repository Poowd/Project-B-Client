"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { imageUrl } from "../../../config";

export default function Page() {
  const [buildList, setBuildList] = useState(null);

  const loadData = async () => {
    try {
      const response = await fetch(`../../../api/e0/browseBuilds`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const fetchData = await response.json();
      setBuildList(fetchData.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="size-full p-5 md:p-10 scroll-smooth">
      <header className="w-full mb-5 border-b border-neutral-800 flex gap-10 pb-2">
        <div className="flex-1">
          <p className={`mb-2.5`}>Showcase your</p>
          <h1 className={`text-4xl font-bold mb-2.5`}>Builds!</h1>
          <h3 className="text-xl"></h3>
        </div>
      </header>
      <section className="w-full mb-5">
        {!buildList ||
          (buildList.length === 0 && <div>No build competitions found.</div>)}
        {!buildList && <div>Loading...</div>}
        {buildList && (
          <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {buildList
              .sort((a, b) => a.Title.localeCompare(b.Title))
              .map((item, i) => (
                <Link
                  key={i}
                  href={{
                    pathname: `/v0/builds/browse/${item.BUILDID}`,
                    query: { data: JSON.stringify(item) },
                  }}
                  className="w-full"
                >
                  <figure className="w-full flex justify-center items-center aspect-video rounded-2xl bg-neutral-900 hover:scale-105 delay-75 duration-150 ease-in-out mb-2.5">
                    <img
                      src={imageUrl.concat(item.Image)}
                      className="size-[90%] object-cover rounded-2xl"
                    ></img>
                  </figure>
                  <p className="text-center">{item.Title}</p>
                </Link>
              ))}
          </section>
        )}
      </section>
    </main>
  );
}

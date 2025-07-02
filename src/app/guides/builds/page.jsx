"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [buildList, setBuildList] = useState(null);
  const [rewardType, setRewardType] = useState(null);

  const load_data = async () => {
    try {
      const response = await fetch(`../../api/v1/build_data`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const fetchData = await response.json();
      setBuildList(fetchData.builds);
      setRewardType(fetchData.rewardtypes);
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
      {!buildList && (
        <main className="h-20 w-full bg-neutral-900 rounded-2xl flex justify-center items-center">
          <p>Fetching Builds...</p>
        </main>
      )}
      {buildList && (
        <section className="w-full grid grid-cols-5 gap-5">
          {buildList.map((item, i) => (
            <Link
              key={i}
              href={{
                pathname: `/guides/builds/${item.id}`,
                query: { data: JSON.stringify(item) },
              }}
              className="w-full"
            >
              <figure className="w-full flex justify-center items-center aspect-square rounded-2xl bg-neutral-900 hover:scale-105 delay-75 duration-150 ease-in-out mb-2.5">
                <img src={item.icon} className="size-32"></img>
              </figure>
              <p className="text-center">{item.title}</p>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}

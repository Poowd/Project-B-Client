"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(JSON.parse(searchParams.get("data")));

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
  };

  return (
    <main className="w-[90%] lg:w-[40%] mx-auto py-20">
      <header className="mb-5 flex justify-end">
        <Link href={"/guides/pets"}>
          <main className="w-fit py-2 px-4 hover:px-10 delay-75 duration-150 ease-in-out bg-neutral-900 rounded-full">
            <p className="text-neutral-400">Back to Lists</p>
          </main>
        </Link>
      </header>
      <section className="w-full flex flex-col gap-5">
        <div className="flex flex-col items-center text-center">
          <figure>
            <img src={data.icon} className="size-20 lg:size-28"></img>
          </figure>
        </div>
        <div className="flex flex-col items-center text-center">
          <p className={`mb-2.5`}>{`${data.start} - ${data.end}`}</p>
          <h1 className={`text-4xl font-bold mb-2.5`}>{data.title}</h1>
          <h3 className="text-xl text-neutral-400">{data.subtitle}</h3>
        </div>

        {data.rewards.length > 0 &&
          data.rewards.map((item, i) => (
            <div key={i}>
              <div>{item.type}</div>
              <div className="w-full flex flex-wrap justify-items-stretch gap-2.5">
                {item.rewards.map((item1, j) => (
                  <div
                    key={(i, j)}
                    className="flex-auto w-fit bg-neutral-900 rounded-2xl py-2 px-4 text-center"
                  >
                    <p className="text-neutral-400">{`${formatNumber(
                      item1.value
                    )} ${item1.reward}`}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        {/* {data.traits.length > 0 &&
            data.traits.map((item, i) => (
              <div key={i} className="bg-neutral-900 rounded-2xl p-5">
                <h3 className="text-xl">{item.trait}</h3>
                <p className="text-neutral-400">{`Cubiod Level: ${item.level}`}</p>
                <p className="text-neutral-400">{item.description}</p>
              </div>
            ))}
          {data.skills.length > 0 &&
            data.skills.map((item, i) => (
              <div key={i} className="bg-neutral-900 rounded-2xl p-5">
                <h3 className="text-xl">{item.skill}</h3>
                <p className="text-neutral-400">{`Cubiod Level: ${item.level}`}</p>
                <p className="text-neutral-400">{item.description}</p>
              </div>
            ))} */}

        <div className="bg-neutral-900 text-neutral-400 rounded-2xl p-10">
          <pre className="text-justify leading-8 mb-5">{data.description}</pre>
          <figure className="w-full aspect-video">
            <img src={data.image} className="size-full rounded-2xl"></img>
          </figure>
        </div>
      </section>
    </main>
  );
}

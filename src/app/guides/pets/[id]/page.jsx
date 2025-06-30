"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [data, setData] = useState(JSON.parse(searchParams.get("data")));

  console.log(data);

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
            <img src={data.image} className="size-20 lg:size-28"></img>
          </figure>
        </div>
        <div className="flex flex-col items-center text-center">
          <p className={`mb-2.5`}>{`${data.type} Cubiod`}</p>
          <h1 className={`text-4xl font-bold mb-2.5`}>{data.name}</h1>
          <h3 className="text-xl text-neutral-400">{data.title}</h3>
        </div>
        <div className="w-full grid grid-cols-2 gap-5">
          {data.traits.length > 0 &&
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
            ))}
        </div>
        <div>
          <pre className="bg-neutral-900 text-neutral-400 rounded-2xl text-justify p-10 leading-8">
            {data.lore}
          </pre>
        </div>
      </section>
    </main>
  );
}

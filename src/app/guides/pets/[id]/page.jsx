"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(JSON.parse(searchParams.get("data")));

  return (
    <main className="w-[90%] lg:w-[40%] mx-auto py-20">
      <header className="mb-5 flex">
        <Link href={"/guides/pets"}>
          <main className="w-fit py-2 px-4 hover:px-10 delay-75 duration-150 ease-in-out bg-neutral-900 rounded-full">
            <p className="text-neutral-400">Back to Lists</p>
          </main>
        </Link>
      </header>
      <section className="w-full flex flex-col gap-5">
        <div>
          <div className="flex gap-10 my-10">
            <figure className="flex-none">
              <img src={data.Image} className="size-20 lg:size-28"></img>
            </figure>
            <div className="flex-1">
              <p className={`mb-2.5`}>{`${data.Type} Cubiod`}</p>
              <h1 className={`text-4xl font-bold mb-2.5`}>{data.Name}</h1>
              <h3 className="text-xl text-neutral-400">{data.Title}</h3>
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-items-stretch gap-2.5 mb-5">
            {data.Archetopia_Pet_Tags.map((item, i) => (
              <div
                key={i}
                className={`flex-auto text-center h-fit w-fit py-2 px-4 bg-neutral-900 border hover:cursor-pointer border-transparent hover:border-neutral-500 delay-75 duration-100 ease-in-out rounded`}
              >
                <div>{item.Tag}</div>
              </div>
            ))}
          </div>
          <hr className="w-full text-neutral-800" />
        </div>
        <div>
          <h3 className="text-xl mb-5">Traits / Skills</h3>
          {data.Archetopia_Pet_Traits.length < 1 &&
            data.Archetopia_Pet_Skills.length < 1 && (
              <p className="text-neutral-700 bg-neutral-900 p-5 rounded-2xl">{`${data.Name} has no Traits / Skills`}</p>
            )}
          <div className="w-full grid grid-cols-2 gap-5">
            {data.Archetopia_Pet_Traits.length > 0 &&
              data.Archetopia_Pet_Traits.map((item, i) => (
                <div key={i} className="bg-neutral-900 rounded-2xl p-5">
                  <h3 className="text-xl">{item.Trait}</h3>
                  <p className="text-neutral-400 text-sm">{`Level ${item.Level}`}</p>
                  <p className="text-neutral-400 text-sm">{item.Description}</p>
                </div>
              ))}
            {data.Archetopia_Pet_Skills.length > 0 &&
              data.Archetopia_Pet_Skills.map((item, i) => (
                <div key={i} className="bg-neutral-900 rounded-2xl p-5">
                  <h3 className="text-xl">{item.Skill}</h3>
                  <p className="text-neutral-400 text-sm">{`Level ${item.Level}`}</p>
                  <p className="text-neutral-400 text-sm">{item.Description}</p>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl mb-5">Lore</h3>
          <pre className="bg-neutral-900 text-neutral-400 rounded-2xl text-justify p-5 leading-8">
            {data.Lore}
          </pre>
        </div>
      </section>
    </main>
  );
}

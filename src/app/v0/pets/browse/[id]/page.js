"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { imageUrl } from "../../../../config";

export default function Page() {
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));

  return (
    <main className="w-full p-10 text-neutral-400">
      <header className="mb-5 flex justify-end">
        <Link href={"/v0/pets/browse"}>
          <div className="w-fit py-2 px-4 hover:px-10 delay-75 duration-150 ease-in-out bg-neutral-950/25 rounded-full">
            <p className="">Back to Lists</p>
          </div>
        </Link>
      </header>
      <section className="w-full flex flex-col gap-5">
        <div>
          <div className="flex gap-10 my-10">
            <figure className="flex-none">
              <img
                src={imageUrl.concat(data.Image)}
                className="size-20 lg:size-28"
              ></img>
            </figure>
            <div className="flex-1">
              <p className={`mb-2.5`}>{`${data.Type} Cubiod`}</p>
              <h1 className={`text-4xl font-bold mb-2.5`}>{data.Name}</h1>
              <h3 className="text-xl">{data.Title}</h3>
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-items-stretch gap-2.5 mb-5">
            {data.Archetopia_Pet_Tags.map((item, i) => (
              <div
                key={i}
                className={`flex-auto text-center h-fit w-fit py-2 px-4 bg-neutral-950/25 border hover:cursor-pointer border-transparent hover:border-neutral-500 delay-75 duration-100 ease-in-out rounded`}
              >
                <div>{item.Tag}</div>
              </div>
            ))}
          </div>
          <hr className="w-full text-neutral-800" />
        </div>
        <div className="flex gap-10">
          <div className="flex-1">
            <h3 className="text-xl mb-5">Lore</h3>
            <pre className=" rounded-2xl text-justify leading-8">
              {data.Lore}
            </pre>
          </div>
          <div className="flex-1 flex flex-col gap-10">
            {data.Archetopia_Pet_Traits && (
              <div>
                <h3 className="text-xl mb-5">Traits</h3>
                <div className="w-full grid grid-cols-2 gap-5">
                  {data?.Archetopia_Pet_Traits.map((item, i) => (
                    <div key={i} className="bg-neutral-950/25 rounded-2xl p-5">
                      <h3 className="text-xl">{item.Trait}</h3>
                      <p className=" text-sm">{`Level ${item.Level}`}</p>
                      <p className=" text-sm">{item.Description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.Archetopia_Pet_Skills && (
              <div>
                <h3 className="text-xl mb-5">Skills</h3>
                <div className="w-full grid grid-cols-2 gap-5">
                  {data?.Archetopia_Pet_Skills.map((item, i) => (
                    <div key={i} className="bg-neutral-950/25 rounded-2xl p-5">
                      <h3 className="text-xl">{item.Skill}</h3>
                      <p className=" text-sm">{`Level ${item.Level}`}</p>
                      <p className=" text-sm">{item.Description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

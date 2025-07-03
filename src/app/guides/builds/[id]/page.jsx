"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getFormattedDate } from "../../../../hooks/functions/getFormattedDate";
import Accordion from "../../../../components/dialog/Accordion";

export default function Page() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(JSON.parse(searchParams.get("data")));

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
  };

  return (
    <main className="w-[90%] lg:w-[40%] mx-auto py-20">
      <header className="mb-5 flex">
        <Link href={"/guides/builds"}>
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
          <p className={`mb-2.5`}>{`${getFormattedDate(
            data.start
          )} - ${getFormattedDate(data.end)}`}</p>
          <h1 className={`text-4xl font-bold mb-2.5`}>{data.title}</h1>
          <h3 className="text-xl text-neutral-400">{data.subtitle}</h3>
        </div>

        {data.rewards.length > 0 &&
          data.rewards.map(
            (item, i) =>
              item.rewards.length > 0 && (
                <div key={i}>
                  <div className="mb-2.5 text-neutral-600 text-xs">
                    {item.type} Rewards
                  </div>
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
              )
          )}
        <div className="bg-neutral-900 text-neutral-400 rounded-2xl p-10">
          <pre className="text-justify leading-8 mb-5">{data.description}</pre>
          <figure className="w-full aspect-video">
            <img src={data.image} className="size-full rounded-2xl"></img>
          </figure>
        </div>
        <div className="w-full">
          {data.entries.length > 0 && (
            <>
              <div className="mb-2.5 text-neutral-600 text-xs">
                Participating Groups / Individual
              </div>
              <div className="w-full flex flex-col gap-5">
                {data.entries
                  .sort((a, b) => b.final_score - a.final_score)
                  .map((item, i) => (
                    <Accordion
                      key={i}
                      button={
                        <div className="w-full bg-neutral-900 rounded-2xl flex items-center gap-5 p-5">
                          <div className="flex-none">
                            <p className="text-neutral-400 text-2xl lg:text-4xl ps-5 font-bold truncate">
                              {i + 1}
                            </p>
                          </div>
                          <div className="flex-10/12">
                            <h3 className="text-xl w-full truncate">
                              {item.title}
                            </h3>
                            <p className="text-neutral-400 w-full truncate">
                              {item.team}
                            </p>
                          </div>
                          <div className="flex-2/12 text-end">
                            <p className="text-neutral-400 w-full truncate">
                              {item.final_score}
                            </p>
                          </div>
                        </div>
                      }
                    >
                      <main className="border border-neutral-800 rounded-2xl p-5 flex gap-5">
                        <section className="flex-none pe-5 border-r border-neutral-800">
                          <pre className="text-justify leading-8">
                            {item.members}
                          </pre>
                        </section>
                        <section className="flex-1">
                          <pre className="text-justify leading-8">
                            {item.description}
                          </pre>
                        </section>
                      </main>
                    </Accordion>
                  ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

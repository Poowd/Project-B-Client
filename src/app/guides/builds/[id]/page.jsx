"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getFormattedDate } from "../../../../hooks/functions/getFormattedDate";
import Accordion from "../../../../components/dialog/Accordion";

export default function Page() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(JSON.parse(searchParams.get("data")));

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
  };

  const separateRewardsByType = (rewards) => {
    const separatedRewards = {};

    rewards.forEach((item) => {
      if (!separatedRewards[item.Type]) {
        separatedRewards[item.Type] = {
          Type: item.Type,
          Rewards: [],
        };
      }

      separatedRewards[item.Type].Rewards.push(item);
    });

    return Object.values(separatedRewards);
  };

  useEffect(() => {
    console.log();
  }, []);

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
        <div>
          <div className="flex gap-10 my-10">
            <figure className="flex-none">
              <img src={data.Icon} className="size-20 lg:size-28"></img>
            </figure>
            <div className="flex-1">
              <p className={`mb-2.5`}>{data.Subtitle}</p>
              <h1 className={`text-4xl font-bold mb-2.5`}>{data.Title}</h1>
              <h3 className="text-xl text-neutral-400">{`${data.StartDate} - ${data.EndDate}`}</h3>
            </div>
          </div>
          {/* <div className="w-full flex flex-wrap justify-items-stretch gap-2.5 mb-5">
            {data.Archetopia_Pet_Tags.map((item, i) => (
              <div
                key={i}
                className={`flex-auto text-center h-fit w-fit py-2 px-4 bg-neutral-900 border hover:cursor-pointer border-transparent hover:border-neutral-500 delay-75 duration-100 ease-in-out rounded`}
              >
                <div>{item.Tag}</div>
              </div>
            ))}
          </div> */}
          <hr className="w-full text-neutral-800" />
        </div>

        <div>
          <div className="flex flex-col gap-5">
            {separateRewardsByType(data.Archetopia_Build_Rewards).length > 0 &&
              separateRewardsByType(data.Archetopia_Build_Rewards).map(
                (item, i) =>
                  item.Rewards.length > 0 && (
                    <div key={i}>
                      <h3 className="text-xl mb-5">{item.Type} Rewards</h3>
                      <div className="w-full flex flex-wrap justify-items-stretch gap-2.5">
                        {item.Rewards.map((item_1, j) => (
                          <div
                            key={(i, j)}
                            className={`flex-auto text-center h-fit w-fit py-2 px-4 bg-neutral-900 border hover:cursor-pointer border-transparent hover:border-neutral-500 delay-75 duration-100 ease-in-out rounded`}
                          >
                            <div className="text-neutral-400">{`${formatNumber(
                              item_1.Value
                            )} ${item_1.Reward}`}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
              )}
          </div>
        </div>
        <div>
          <h3 className="text-xl mb-5">Description</h3>
          <pre className="bg-neutral-900 text-neutral-400 rounded-2xl text-justify p-5 leading-8">
            {data.Description}
          </pre>
        </div>
        <div>
          <figure className="w-full aspect-video">
            <img
              src={`https://smuswfciyyvbsigrcbha.supabase.co/storage/v1/object/public/images/${data.Image}`}
              className="size-full rounded-2xl object-cover object-center"
            ></img>
          </figure>
        </div>
        {/* <div className="w-full">
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
        </div> */}
      </section>
    </main>
  );
}

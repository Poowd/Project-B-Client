"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { imageUrl } from "../../../config";
import { getFormattedDate } from "../../../../hooks/functions/getFormattedDate";

export default function Page() {
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("data"));

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

  return (
    <main className="w-full p-10 text-neutral-400">
      <header className="mb-5 flex justify-end">
        <Link href={"/v0/builds"}>
          <div className="w-fit py-2 px-4 hover:px-10 delay-75 duration-150 ease-in-out bg-neutral-950/25 rounded-full">
            <p className="">Back to Lists</p>
          </div>
        </Link>
      </header>
      <section className="w-full flex flex-col gap-5">
        <div>
          <div className="flex flex-col md:flex-row gap-10 my-10">
            <figure className="flex-none">
              <img
                src={imageUrl.concat(data.Image)}
                className="w-full md:h-52 lg:h-64 aspect-video rounded-2xl"
              ></img>
            </figure>
            <div className="flex-1">
              <p className={`mb-2.5`}>{data.Subtitle}</p>
              <h1 className={`text-4xl font-bold mb-2.5`}>{data.Title}</h1>
              <h3 className="text-xl">{`${getFormattedDate(
                data.StartDate
              )} until ${getFormattedDate(data.EndDate)}`}</h3>
            </div>
          </div>
          <hr className="w-full text-neutral-800" />
        </div>
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-4/6 flex gap-10">
            <div className="flex-1">
              <h3 className="text-xl mb-5">Description</h3>
              <pre className=" rounded-2xl text-justify leading-8">
                {data.Description}
              </pre>
            </div>
          </div>
          <div className="flex-2/6 flex flex-col gap-5">
            {separateRewardsByType(data.Archetopia_Build_Rewards).length > 0 &&
              separateRewardsByType(data.Archetopia_Build_Rewards).map(
                (item, i) =>
                  item.Rewards.length > 0 && (
                    <div key={i}>
                      <h3 className="text-xl mb-5">{item.Type} Rewards</h3>
                      <div className="w-full flex flex-col gap-2.5">
                        {item.Rewards.map((item_1, j) => (
                          <div
                            key={(i, j)}
                            className={`flex-auto text-center h-fit w-full text-start py-1 px-4 bg-neutral-900 border hover:cursor-pointer border-transparent hover:border-neutral-500 delay-75 duration-100 ease-in-out rounded`}
                          >
                            <div className="text-neutral-400">{`${formatNumber(
                              item_1.Value
                            )} ${item_1.Reward}`}</div>
                          </div>
                        ))}
                      </div>
                      <hr className="text-neutral-700 w-full mt-5" />
                    </div>
                  )
              )}
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import Input from "../../forms/input/Input";
import SkeletonCubiods_1 from "../../../components/package/SkeletonCubiods_1";
import ContentLists from "../../../components/pages/ContentLists";
import BuildCompInformation from "../../../components/package/BuildCompInformation";
import BuildCompReward from "../../../components/package/BuildCompReward";
import BuildCompDetail from "../../../components/single/modal/BuildCompDetail";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { SlArrowUp } from "react-icons/sl";
import InformationModal from "../../../components/single/modal/InformationModal";
import RegularButton from "../../../components/single/button/RegularButton";

export default function Page() {
  const date = new Date();
  const [isPending, startTransition] = useTransition();
  const [buildcomps, setBuildComps] = useState([]);
  const [buildcompsRewards, setBuildCompsRewards] = useState([]);
  const [buildcompsRewardTypes, setBuildCompsRewardTypes] = useState([]);
  const [buildcompsEntries, setBuildCompsEntries] = useState([]);
  const [scores, setScores] = useState([]);
  const [search, setSearch] = useState("");
  const [currentBuildComp, setCurrentBuildComp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "FALSE",
    "",
  ]);

  const currentDate = date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });

  const loadBuildCompList = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`../../api/buildcomp_list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Parse the response content
        const fetchData = await response.json();

        setBuildComps(fetchData.buildcomps.slice(1).reverse());
        return;
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    setCurrentBuildComp(buildcomps[0]);
  }, [buildcomps]);

  const loadBuildCompRewards = async () => {
    try {
      const response = await fetch(`../../api/buildcomp_rewards`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Parse the response content
      const fetchData = await response.json();

      setBuildCompsRewards(fetchData.rewards.slice(1));
      setBuildCompsRewardTypes(fetchData.rewardTypes.slice(1));
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const loadBuildCompEntries = async () => {
    try {
      const response = await fetch(`../../api/buildcomp_entries`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Parse the response content
      const fetchData = await response.json();

      setBuildCompsEntries(fetchData.entries.slice(1));
      setScores(fetchData.scores.slice(1));
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBuildCompList();
    loadBuildCompRewards();
    loadBuildCompEntries();
  }, []);

  const getBuildCompRewards = (array, column, id, type) => {
    const Rewards = array.filter(
      (buildcomp) => buildcomp[column] === id && buildcomp[4] === type
    );
    return Rewards;
  };

  const getBuildCompEntries = (array, column, id) => {
    const Entries = array.filter((buildcomp) => buildcomp[column] === id);
    return Entries;
  };

  const getEntryScore = (id, array) => {
    let tempScore = 0;
    const scoreList = array.filter((e) => e[2] === id);
    const totalScore = 100 * scoreList.length;

    if (scoreList.length < 1) {
      return 0;
    }

    for (let i = 0; i < scoreList.length; i++) {
      const scores = scoreList[i];
      tempScore = tempScore + (+scores[3] + +scores[4] + +scores[5]);
    }

    tempScore = Math.round((tempScore / totalScore) * 100).toFixed(0);

    return tempScore;
  };

  const getAllScores = (array) => {
    let participation = [];

    for (let i = 0; i < array.length; i++) {
      const ranking = array[i];
      participation.push([
        ranking[0],
        ranking[1],
        ranking[2],
        ranking[3],
        ranking[4],
        ranking[5],
        ranking[6],
        ranking[7],
        ranking[8],
        getEntryScore(ranking[0], scores),
      ]);
    }

    participation = participation.sort((a, b) => b[9] - a[9]);

    return participation;
  };

  return (
    <ContentLists
      search={
        <Input
          style={
            "outline-0 bg-neutral-800 w-full py-2 px-5 text-sm rounded-full"
          }
          id={"search"}
          placeholder={"Search"}
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
      }
      buttons={
        <>
          <InformationModal
            button={<RegularButton>Standings</RegularButton>}
            buttons={<></>}
          >
            {buildcomps && currentBuildComp && (
              <>
                {currentBuildComp[7] === "TRUE" ? (
                  <main className="rounded p-10">
                    <header className="mb-5 text-center md:text-start">
                      <h1 className="text-4xl text-cyan-600">{`${currentBuildComp[1]} is On-Going!`}</h1>
                      <p className="w-full lg:w-1/2 text-neutral-500">
                        This contains the list of available categories!
                      </p>
                    </header>
                    <section className="w-full flex flex-col gap-5 mt-10">
                      {getAllScores(buildcompsEntries) &&
                        getAllScores(buildcompsEntries)?.map(
                          (item, i) =>
                            currentBuildComp[8] === item[8] && (
                              <div
                                key={i}
                                className="w-full flex items-center gap-5 border border-neutral-800 rounded p-5"
                              >
                                <section className="flex justify-center flex-wrap gap-3">
                                  <div className="size-20 flex flex-col justify-center items-center">
                                    <p className="text-xs">Rank</p>
                                    <p>{i + 1}</p>
                                  </div>
                                  <div className="h-20 flex flex-col justify-center items-center">
                                    |
                                  </div>
                                  <div className="size-20 flex flex-col justify-center items-center">
                                    <p className="text-xs">Score</p>
                                    <p>{getEntryScore(item[0], scores)}</p>
                                  </div>
                                  <div className="h-20 flex flex-col justify-center items-center">
                                    |
                                  </div>
                                </section>
                                <header className="text-start">
                                  <h3 className="text-sm">{item[2]}</h3>
                                  <h1 className="text-xl font-light">
                                    {item[4]}
                                  </h1>
                                </header>
                              </div>
                            )
                        )}
                    </section>
                  </main>
                ) : (
                  "No Active Build Competition"
                )}
              </>
            )}
          </InformationModal>
        </>
      }
      additionalContents={<></>}
    >
      {isPending && <SkeletonCubiods_1></SkeletonCubiods_1>}
      {!isPending && (
        <>
          {buildcomps?.map(
            (buildcomp, buildcompkey) =>
              (buildcomp[1]?.toLowerCase().includes(search.toLowerCase()) ||
                search == null) && (
                <BuildCompInformation
                  key={buildcompkey}
                  entries={getBuildCompEntries(
                    buildcompsEntries,
                    1,
                    buildcomp[0]
                  ).map((entry, entrykey) => (
                    <BuildCompDetail key={entrykey} button={entry[4]}>
                      <main>
                        <section>
                          <p>Team: {entry[2]}</p>
                          <p>Members: {entry[3]}</p>
                          <p>Build: {entry[4]}</p>
                          <p>Description: {entry[5]}</p>
                        </section>
                      </main>
                    </BuildCompDetail>
                  ))}
                  buildcomp={buildcomp}
                >
                  {buildcompsRewardTypes.map(
                    (type, typekey) =>
                      getBuildCompRewards(
                        buildcompsRewards,
                        1,
                        buildcomp[0],
                        type[1]
                      ).length > 0 && (
                        <BuildCompDetail
                          key={typekey}
                          button={<div className="">{type[1]}</div>}
                        >
                          <BuildCompReward
                            rewards={getBuildCompRewards(
                              buildcompsRewards,
                              1,
                              buildcomp[0],
                              type[1]
                            )}
                          ></BuildCompReward>
                        </BuildCompDetail>
                      )
                  )}
                </BuildCompInformation>
              )
          )}
        </>
      )}
    </ContentLists>
  );
}

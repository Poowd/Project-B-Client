"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import Input from "../../forms/input/Input";
import SkeletonCubiods_1 from "../../../components/package/SkeletonCubiods_1";
import BuildCompContent from "../../../components/pages/BuildCompContent";
import BuildCompInformation from "../../../components/package/BuildCompInformation";
import BuildCompReward from "../../../components/package/BuildCompReward";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const [buildcomps, setBuildComps] = useState([]);
  const [buildcompsRewards, setBuildCompsRewards] = useState([]);
  const [buildcompsRewardTypes, setBuildCompsRewardTypes] = useState([]);
  const [search, setSearch] = useState("");

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

  useEffect(() => {
    loadBuildCompList();
    loadBuildCompRewards();
  }, []);

  const getBuildCompRewards = (array, column, id, type) => {
    const Rewards = array.filter(
      (buildcomp) => buildcomp[column] === id && buildcomp[4] === type
    );
    return Rewards;
  };

  return (
    <BuildCompContent
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
      buttons={<></>}
    >
      {isPending && <SkeletonCubiods_1></SkeletonCubiods_1>}
      {!isPending && (
        <>
          {buildcomps?.map(
            (buildcomp, buildcompkey) =>
              (buildcomp[1]?.toLowerCase().includes(search.toLowerCase()) ||
                search == null) && (
                <BuildCompInformation key={buildcompkey} buildcomp={buildcomp}>
                  {buildcompsRewardTypes.map((type, typekey) => (
                    <BuildCompReward
                      key={typekey}
                      title={type[1]}
                      rewards={getBuildCompRewards(
                        buildcompsRewards,
                        1,
                        buildcomp[0],
                        type[1]
                      )}
                    ></BuildCompReward>
                  ))}
                </BuildCompInformation>
              )
          )}
        </>
      )}
    </BuildCompContent>
  );
}

"use client";

import { useEffect, useState, useTransition } from "react";
import Input from "../../../forms/input/Input";
import InformationModal from "../../../../components/single/modal/InformationModal";
import TableButton from "../../../../components/single/button/TableButton";
import { MdOutlineViewInAr } from "react-icons/md";
import DevspotContent1 from "../../../../components/pages/DevspotCubiodsContent";
import BuildCompDetails from "../../../../components/package/BuildCompDetails";
import SkeletonCubiods_2 from "../../../../components/package/SkeletonCubiods_2";
import FormModal from "../../../../components/single/modal/FormModal";
import AddBuildComp from "../../../forms/AddBuildComp";
import { getFormattedDate } from "../../../../hooks/functions/getFormattedDate";
import StatusBuildComp from "../../../forms/StatusBuildComp";
import { FaRegStar } from "react-icons/fa6";
import { TbEditCircle } from "react-icons/tb";
import EditBuildComp from "../../../forms/EditBuildComp";
import BuildCompReward from "../../../../components/package/BuildCompReward";
import AddRewards from "../../../forms/AddRewards";
import { LuSmilePlus } from "react-icons/lu";

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
    <DevspotContent1
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
          <FormModal
            button={
              <div className="border-0 py-2 px-5 text-sm rounded-full bg-red-500 hover:bg-red-600 shadow-sm text-white">
                Add BuildComp
              </div>
            }
          >
            <AddBuildComp
              fetchOnFinish={() => loadBuildCompList()}
            ></AddBuildComp>
          </FormModal>
        </>
      }
    >
      <header className="mb-3">
        <section className="flex p-3 bg-neutral-800 rounded text-sm">
          <div className="flex-none overflow-hidden truncate px-2 w-2/12">
            Title
          </div>
          <div className="flex-none overflow-hidden truncate px-2 w-3/12">
            Subtitle
          </div>
          <div className="flex-none overflow-hidden truncate px-1 w-2/12">
            Start
          </div>
          <div className="flex-none overflow-hidden truncate px-1 w-2/12">
            End
          </div>
          <div className="flex-none overflow-hidden truncate px-2 w-3/12 text-end">
            Action
          </div>
        </section>
      </header>
      <main className="w-full flex flex-col gap-2 overflow-hidden">
        {isPending && <SkeletonCubiods_2></SkeletonCubiods_2>}
        {!isPending && (
          <>
            {buildcomps?.map(
              (buildcomp, buildcompkey) =>
                (buildcomp[1]?.toLowerCase().includes(search.toLowerCase()) ||
                  search == null) && (
                  <section
                    key={buildcompkey}
                    className={`h-20 w-full flex items-center px-3 bg-neutral-800 rounded`}
                  >
                    <div className="flex-none overflow-hidden truncate px-2 w-2/12">
                      {buildcomp[1]}
                    </div>
                    <div className="flex-none overflow-hidden truncate px-2 w-3/12">
                      {buildcomp[2]}
                    </div>
                    <div className="flex-none overflow-hidden truncate px-2 w-2/12">
                      {getFormattedDate(buildcomp[3])}
                    </div>
                    <div className="flex-none overflow-hidden truncate px-2 w-2/12">
                      {getFormattedDate(buildcomp[4])}
                    </div>
                    <div className="flex-none overflow-hidden truncate px-2 w-3/12 flex justify-end gap-1">
                      <FormModal
                        button={
                          <TableButton>
                            <FaRegStar />
                          </TableButton>
                        }
                      >
                        <StatusBuildComp
                          fetchOnFinish={() => loadBuildCompList()}
                          ID={buildcomp[0]}
                        ></StatusBuildComp>
                      </FormModal>
                      <FormModal
                        button={
                          <TableButton>
                            <TbEditCircle />
                          </TableButton>
                        }
                      >
                        <EditBuildComp
                          fetchOnFinish={() => loadBuildCompList()}
                          entry={{
                            ID: buildcomp[0],
                            Title: buildcomp[1],
                            Subtitle: buildcomp[2],
                            Start: buildcomp[3],
                            End: buildcomp[4],
                            Description: buildcomp[5],
                            Image: buildcomp[6],
                          }}
                        ></EditBuildComp>
                      </FormModal>
                      <InformationModal
                        button={
                          <TableButton>
                            <MdOutlineViewInAr />
                          </TableButton>
                        }
                        buttons={
                          <>
                            <FormModal
                              button={
                                <TableButton>
                                  <LuSmilePlus />
                                </TableButton>
                              }
                            >
                              <AddRewards
                                fetchOnFinish={() => loadBuildCompRewards()}
                                ID={buildcomp[0]}
                                types={buildcompsRewardTypes}
                              ></AddRewards>
                            </FormModal>
                          </>
                        }
                      >
                        <BuildCompDetails buildcomp={buildcomp}>
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
                        </BuildCompDetails>
                      </InformationModal>
                    </div>
                  </section>
                )
            )}
          </>
        )}
      </main>
    </DevspotContent1>
  );
}

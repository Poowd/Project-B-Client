"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import FormModal from "../../../../../components/single/modal/FormModal";
import EvaluateBuild from "../../../../forms/EvaluateBuild";
import { getFormattedDate } from "../../../../../hooks/functions/getFormattedDate";

export default function Page() {
  const param = useParams();
  const [isPending, startTransition] = useTransition();
  const [buildcomp, setBuildComp] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [scores, setScores] = useState([]);

  const loadBuildCompJudging = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`../../../../api/buildcomp_judging`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID: param.code,
          }),
        });

        // Parse the response content
        const fetchData = await response.json();
        setBuildComp(fetchData.buildcomp);
        setParticipants(fetchData.entries);
        setScores(fetchData.scores);

        console.log(fetchData.entries);
        return;
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    loadBuildCompJudging();
  }, []);

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

  return !isPending
    ? buildcomp && (
        <main>
          <header>
            <h1>{buildcomp[1]}</h1>
            <h3>{`${buildcomp[2]}`}</h3>
            <p>{`${getFormattedDate(buildcomp[3])}-${getFormattedDate(
              buildcomp[4]
            )}`}</p>
          </header>
          <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
            {getAllScores(participants) &&
              getAllScores(participants)?.map((item, i) => (
                <div
                  key={i}
                  className="w-full border border-neutral-800 rounded p-5"
                >
                  <header className="text-center">
                    <h3 className="text-sm">{item[2]}</h3>
                    <h1 className="text-xl font-light">{item[4]}</h1>
                  </header>
                  <hr className="w-full my-3 text-neutral-800" />
                  <section className="flex justify-center flex-wrap gap-3">
                    <div className="size-20 border border-neutral-800 flex flex-col justify-center items-center">
                      <p className="text-xs">Rank</p>
                      <p>{i + 1}</p>
                    </div>
                    <div className="size-20 border border-neutral-800 flex flex-col justify-center items-center">
                      <p className="text-xs">Score</p>
                      <p>{getEntryScore(item[0], scores)}</p>
                    </div>
                  </section>
                  <hr className="w-full my-3 text-neutral-800" />
                  <section className="flex gap-3 text-xs justify-center flex-wrap">
                    {scores &&
                      scores
                        .filter((e) => e[2] === item[0])
                        .map((judge, j) => (
                          <div key={j}>
                            <p>{judge[1]}</p>
                          </div>
                        ))}
                  </section>
                  <hr className="w-full my-3 text-neutral-800" />
                  <section className="flex justify-center">
                    <FormModal
                      button={
                        <div className="border-0 py-2 px-5 text-sm rounded-full bg-red-500 hover:bg-red-600 shadow-sm text-white">
                          Evaluate
                        </div>
                      }
                    >
                      <EvaluateBuild
                        entry={item[0]}
                        code={item[8]}
                        fetchOnFinish={() => loadBuildCompJudging()}
                      ></EvaluateBuild>
                    </FormModal>
                  </section>
                </div>
              ))}
          </section>
        </main>
      )
    : "Please Wait";
}

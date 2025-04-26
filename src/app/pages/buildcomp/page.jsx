"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import CubiodsContent from "../../../components/pages/CubiodsContent";
import Input from "../../forms/input/Input";
import PetInformation from "../../../components/package/PetInformation";
import SkeletonCubiods_1 from "../../../components/package/SkeletonCubiods_1";
import { getPetColor } from "../../../hooks/functions/getPetColor";
import { getPetBackgroundColor } from "../../../hooks/functions/getPetBackgroundColor";
import { getPetHighlights } from "../../../hooks/functions/getPetHighlights";
import InformationModal from "../../../components/single/modal/InformationModal";
import { getBackgroundColor } from "../../../hooks/functions/getBackgroundColor";
import PetEffect from "../../../components/package/PetEffect";
import PetTag from "../../../components/package/PetTag";
import RegularButton from "../../../components/single/button/RegularButton";
import BuildCompContent from "../../../components/pages/BuildCompContent";
import Card4 from "../../../components/single/card/Card4";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const [buildcomps, setBuildComps] = useState([]);
  const [petTraits, setPetTraits] = useState([]);
  const [petSkills, setPetSkills] = useState([]);
  const [petCategories, setPetCategories] = useState([]);
  const [petTags, setPetTags] = useState([]);
  const [petCubiodTag, setPetCubiodTag] = useState([]);
  const [search, setSearch] = useState("");

  const getGoogleSheetData = () => {
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

        setBuildComps(fetchData.buildcomps.slice(1));
        return;
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getGoogleSheetData();
  }, []);

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
          {buildcomps?.map((buildcomp, buildcompkey) => (
            <Card4
              key={buildcompkey}
              title={buildcomp[1]}
              subtitle={buildcomp[2]}
              start={buildcomp[3]}
              end={buildcomp[4]}
              image={buildcomp[6]}
            ></Card4>
          ))}
        </>
      )}
    </BuildCompContent>
  );
}

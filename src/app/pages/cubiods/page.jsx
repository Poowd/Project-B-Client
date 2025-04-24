"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import CubiodsContent from "../../../components/pages/CubiodsContent";
import Input from "../../forms/input/Input";
import PetInformation from "../../../components/package/PetInformation";
import PeteffectEffect from "../../../components/package/PetTraitEffect";
import SkeletonCubiods_1 from "../../../components/package/SkeletonCubiods_1";
import { getPetColor } from "../../../hooks/functions/getPetColor";
import { getPetBackgroundColor } from "../../../hooks/functions/getPetBackgroundColor";
import { getPetHighlights } from "../../../hooks/functions/getPetHighlights";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const [pets, setPets] = useState([]);
  const [petTraits, setPetTraits] = useState([]);
  const [petSkills, setPetSkills] = useState([]);
  const [petCategories, setPetCategories] = useState([]);
  const [search, setSearch] = useState("");

  const getGoogleSheetData = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`../../api/cubiods_list`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Parse the response content
        const fetchData = await response.json();

        setPets(fetchData.pets.slice(1));
        setPetTraits(fetchData.traits.slice(1));
        setPetSkills(fetchData.skills.slice(1));
        setPetCategories(fetchData.categories.slice(1));
        return;
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    getGoogleSheetData();
  }, []);

  const getCubiodsEffect = (array, column, id) => {
    const Effect = array.filter((pet) => pet[column] === id);
    return Effect;
  };

  return (
    <CubiodsContent
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
          {pets?.map(
            (pet, key) =>
              (pet[1]?.toLowerCase().includes(search.toLowerCase()) ||
                search == null) && (
                <PetInformation
                  color={getPetColor(pet[3], petCategories)}
                  bg_color={getPetBackgroundColor(pet[3], petCategories)}
                  key={key}
                  image={pet[4]}
                  name={pet[1]}
                  type={pet[3]}
                  title={pet[2]}
                  lore={pet[5]}
                  buttons={<></>}
                >
                  <PeteffectEffect
                    highlight={getPetHighlights(pet[3], petCategories)}
                    title={"Traits"}
                    effects={getCubiodsEffect(petTraits, 1, pet[0])}
                  ></PeteffectEffect>
                  <PeteffectEffect
                    highlight={getPetHighlights(pet[3], petCategories)}
                    title={"Skills"}
                    effects={getCubiodsEffect(petSkills, 1, pet[0])}
                  ></PeteffectEffect>
                </PetInformation>
              )
          )}
        </>
      )}
    </CubiodsContent>
  );
}

"use client";

import { Suspense, useEffect, useState, useTransition } from "react";
import CubiodsContent from "../../../components/pages/CubiodsContent";
import Input from "../../forms/input/Input";
import PetInformation from "../../../components/package/PetInformation";
import PeteffectEffect from "../../../components/package/PetEffect";
import SkeletonCubiods_1 from "../../../components/package/SkeletonCubiods_1";
import { getPetColor } from "../../../hooks/functions/getPetColor";
import { getPetBackgroundColor } from "../../../hooks/functions/getPetBackgroundColor";
import { getPetHighlights } from "../../../hooks/functions/getPetHighlights";
import InformationModal from "../../../components/single/modal/InformationModal";
import { getColor } from "../../../hooks/functions/getColor";
import { getBackgroundColor } from "../../../hooks/functions/getBackgroundColor";
import PetEffect from "../../../components/package/PetEffect";
import PetTag from "../../../components/package/PetTag";
import RegularButton from "../../../components/single/button/RegularButton";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const [pets, setPets] = useState([]);
  const [petTraits, setPetTraits] = useState([]);
  const [petSkills, setPetSkills] = useState([]);
  const [petCategories, setPetCategories] = useState([]);
  const [petTags, setPetTags] = useState([]);
  const [petCubiodTag, setPetCubiodTag] = useState([]);
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
        setPetTags(fetchData.tags.slice(1));
        setPetCubiodTag(fetchData.petTags.slice(1));
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

  const getCubiodsTag = (array, column, id) => {
    const Tag = array.filter((pet) => pet[column] === id);
    return Tag;
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
      buttons={
        <>
          <InformationModal
            button={<RegularButton>Categories</RegularButton>}
            buttons={<></>}
          >
            <main className="h-full p-10 bg-neutral-900">
              <header className="mb-5">
                <h1 className="text-4xl text-cyan-600">Categories</h1>
                <p className="w-1/2 text-neutral-500">
                  This contains the list of available categories!
                </p>
              </header>
              <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {petCategories.map((category, categorykey) => (
                  <div
                    key={categorykey}
                    className={`h-20 w-full flex items-center justify-between px-5 bg-neutral-800 rounded font-extrabold ${getBackgroundColor(
                      category[3]
                    )}`}
                  >
                    <section>{category[1]}</section>
                    <section className="text-2xl">
                      {pets.filter((pet) => pet[3] === category[1]).length}
                    </section>
                  </div>
                ))}
              </section>
            </main>
          </InformationModal>
          <InformationModal
            button={<RegularButton>Tags</RegularButton>}
            buttons={<></>}
          >
            <main className="h-full p-10 bg-neutral-900">
              <header className="mb-5">
                <h1 className="text-4xl text-cyan-600">Tags</h1>
                <p className="w-1/2 text-neutral-500">
                  This contains the list of available tags!
                </p>
              </header>
              <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {petTags.map((tag, tagkey) => (
                  <div
                    key={tagkey}
                    className={`h-20 w-full flex items-center justify-between px-5 bg-neutral-800 rounded`}
                  >
                    <section>{tag[1]}</section>
                    <section className="font-semibold">
                      {petCubiodTag.filter((pet) => pet[2] === tag[1]).length}
                    </section>
                  </div>
                ))}
              </section>
            </main>
          </InformationModal>
        </>
      }
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
                  <PetTag
                    highlight={getPetHighlights(pet[3], petCategories)}
                    title={"Available on!"}
                    tags={getCubiodsTag(petCubiodTag, 1, pet[0])}
                  ></PetTag>
                  <PetEffect
                    highlight={getPetHighlights(pet[3], petCategories)}
                    title={"Traits"}
                    effects={getCubiodsEffect(petTraits, 1, pet[0])}
                  ></PetEffect>
                  <PetEffect
                    highlight={getPetHighlights(pet[3], petCategories)}
                    title={"Skills"}
                    effects={getCubiodsEffect(petSkills, 1, pet[0])}
                  ></PetEffect>
                </PetInformation>
              )
          )}
        </>
      )}
    </CubiodsContent>
  );
}

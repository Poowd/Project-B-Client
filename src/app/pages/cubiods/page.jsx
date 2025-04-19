"use client";

import { Suspense, useEffect, useState } from "react";
import CubiodsContent from "../../../components/pages/CubiodsContent";
import Input from "../../forms/input/Input";
import FormModal from "../../../components/single/modal/FormModal";
import AddPet from "../../forms/AddPet";
import PetInformation from "../../../components/package/PetInformation";
import PetTraitDetails from "../../../components/package/PetTraitDetails";
import PetSkillDetails from "../../../components/package/PetSkillDetails";

export default function Page() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [secret, setSecret] = useState(null);

  const getList = async () => {
    try {
      const response = await fetch(`../../api/pets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Parse the response content
      const petsFetched = await response.json();
      console.log(petsFetched.data.pets);

      return; //setPets(petsFetched.data.pets);
    } catch (error) {
      console.log(error);
    }
  };

  const getGoogleSheetData = async () => {
    try {
      const response = await fetch(`../../api/cubiods_list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Parse the response content
      const fetchData = await response.json();
      console.log(fetchData.data.slice(1));

      return setPets(fetchData.data.slice(1));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const secretValue = window.localStorage.getItem("do_not_spread");
      if (secretValue === null) {
        window.localStorage.setItem("do_not_spread", "");
      }
      setSecret(secretValue);
    } else {
    }
    //getList();
    getGoogleSheetData();
  }, []);

  return (
    <CubiodsContent
      search={
        <Input
          style={
            "outline-0 border border-neutral-300 bg-neutral-50 w-full py-2 px-5 text-sm rounded-full"
          }
          id={"search"}
          placeholder={"Search"}
          onChange={(e) => setSearch(e.target.value)}
        ></Input>
      }
      buttons={
        <>
          {secret && secret === "foodguy05" && (
            <FormModal
              button={
                <div className="border-0 py-2 px-5 text-sm rounded-full bg-red-400 hover:bg-red-500 shadow-sm text-white">
                  Add Pet
                </div>
              }
            >
              <AddPet
                fetchOnFinish={() => getGoogleSheetData()}
                totalPets={pets.length}
              ></AddPet>
            </FormModal>
          )}
        </>
      }
    >
      <Suspense fallback={<p>Loading pets...</p>}>
        {pets?.map(
          (pet, key) =>
            (pet[1]?.toLowerCase().includes(search.toLowerCase()) ||
              search == null) && (
              <PetInformation
                key={key}
                image={pet[4]}
                name={pet[1]}
                type={pet[2]}
                title={pet[3]}
                lore={pet[5]}
                buttons={<></>}
              >
                <PetTraitDetails traits={pet.Traits}></PetTraitDetails>
                <PetSkillDetails skills={pet.Skills}></PetSkillDetails>
              </PetInformation>
            )
        )}
      </Suspense>
    </CubiodsContent>
  );
}

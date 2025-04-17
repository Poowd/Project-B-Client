"use client";

import AddPet from "@/app/forms/AddPet";
import EditPet from "@/app/forms/EditPet";
import Input from "@/app/forms/input/Input";
import PetInformation from "@/components/package/PetInformation";
import PetSkillDetails from "@/components/package/PetSkillDetails";
import PetTraitDetails from "@/components/package/PetTraitDetails";
import CubiodsContent from "@/components/pages/CubiodsContent";
import FormModal from "@/components/single/modal/FormModal";
import { useEffect, useState } from "react";

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

      return setPets(petsFetched.data.pets);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const secretValue = window.localStorage.getItem("do_not_spread");
      setSecret(secretValue);
    } else {
      window.localStorage.setItem("do_not_spread", "");
    }
    getList();
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
              <AddPet fetchOnFinish={() => getList()}></AddPet>
            </FormModal>
          )}
        </>
      }
    >
      {pets?.map(
        (pet) =>
          (pet.Name.toLowerCase().includes(search.toLowerCase()) ||
            search == null) && (
            <PetInformation
              key={pet.ID}
              image={pet.Image}
              name={pet.Name}
              type={pet.Type}
              title={pet.Title}
              lore={pet.Lore}
              buttons={
                <>
                  <FormModal
                    button={
                      <div className="py-2 px-4 border border-neutral-300 rounded-full text-xs text-neutral-800 flex justify-center items-center hover:bg-neutral-100 hover:cursor-pointer">
                        Edited
                      </div>
                    }
                  >
                    <EditPet
                      fetchOnFinish={() => getList()}
                      entry={{
                        ID: pet.ID,
                        Image: pet.Image,
                        Name: pet.Name,
                        Type: pet.Type,
                        Title: pet.Title,
                        Lore: pet.Lore,
                      }}
                    ></EditPet>
                  </FormModal>
                </>
              }
            >
              <PetTraitDetails traits={pet.Traits}></PetTraitDetails>
              <PetSkillDetails skills={pet.Skills}></PetSkillDetails>
            </PetInformation>
          )
      )}
    </CubiodsContent>
  );
}

"use client";

import { useEffect, useState, useTransition } from "react";
import { TbEditCircle } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import AddPet from "../../../forms/AddPet";
import FormModal from "../../../../components/single/modal/FormModal";
import UpdateStatus from "../../../forms/UpdateStatus";
import EditPet from "../../../forms/EditPet";
import InformationModal from "../../../../components/single/modal/InformationModal";
import { MdOutlineViewInAr } from "react-icons/md";
import TableButton from "../../../../components/single/button/TableButton";
import PetDetails from "../../../../components/package/PetDetails";
import PeteffectEffect from "../../../../components/package/PetTraitEffect";
import AddTrait from "../../../forms/AddTrait";
import { LuSmilePlus } from "react-icons/lu";
import { PiTarget } from "react-icons/pi";
import AddSkill from "../../../forms/AddSkill";
import SkeletonCubiods_2 from "../../../../components/package/SkeletonCubiods_2";
import AddCategory from "../../../forms/AddCategory";
import { getColor } from "../../../../hooks/functions/getColor";
import { getPetColor } from "../../../../hooks/functions/getPetColor";

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
    <main className="flex flex-col gap-5">
      {/* [ABOUT] Description and Introduction of the Table */}
      <header>
        <h1 className="text-4xl text-cyan-600">Cubiods</h1>
        <p className="w-1/2 text-neutral-500">
          This contains the list of available pets along with their lores!
        </p>
      </header>

      {/* [ABOUT] Functionalities like Adding of Entries */}
      <section className="flex gap-3 justify-end">
        <InformationModal
          button={
            <div className="border-0 py-2 px-5 text-sm rounded-full bg-neutral-800 hover:bg-neutral-900 shadow-sm text-white">
              Categories
            </div>
          }
          buttons={
            <>
              <FormModal
                button={
                  <TableButton>
                    <FaRegStar />
                  </TableButton>
                }
              >
                <AddCategory
                  fetchOnFinish={() => getGoogleSheetData()}
                  totalPets={pets.length}
                ></AddCategory>
              </FormModal>
            </>
          }
        >
          <main className="h-full p-10 bg-neutral-900">
            <header className="mb-5">
              <h1 className="text-4xl text-cyan-600">Categories</h1>
              <p className="w-1/2 text-neutral-500">
                This contains the list of available categories!
              </p>
            </header>
            <section className="flex flex-col gap-2">
              {petCategories.map((category, categorykey) => (
                <div
                  key={categorykey}
                  className={`h-20 w-full flex items-center justify-between px-5 bg-neutral-800 rounded ${getColor(
                    category[3]
                  )}`}
                >
                  <section>{category[1]}</section>
                  <section className="font-semibold">
                    {pets.filter((pet) => pet[3] === category[1]).length}
                  </section>
                </div>
              ))}
            </section>
          </main>
        </InformationModal>
        <FormModal
          button={
            <div className="border-0 py-2 px-5 text-sm rounded-full bg-red-500 hover:bg-red-600 shadow-sm text-white">
              Add Pet
            </div>
          }
        >
          <AddPet
            fetchOnFinish={() => getGoogleSheetData()}
            categories={petCategories}
            totalPets={pets.length}
          ></AddPet>
        </FormModal>
      </section>

      {/* [ABOUT] The Table holding the list of Entries */}
      <section>
        <main>
          <header className="mb-3">
            <section className="flex p-3 bg-neutral-800 rounded text-sm">
              <div className="flex-none overflow-hidden truncate px-2 w-2/12">
                Name
              </div>
              <div className="flex-none overflow-hidden truncate px-2 w-3/12">
                Title
              </div>
              <div className="flex-none overflow-hidden truncate px-2 w-2/12">
                Type
              </div>
              <div className="flex-none overflow-hidden truncate px-2 w-5/12 text-end">
                Action
              </div>
            </section>
          </header>
          <main className="w-full flex flex-col gap-2 overflow-hidden">
            {isPending && <SkeletonCubiods_2></SkeletonCubiods_2>}
            {!isPending && (
              <>
                {pets?.map(
                  (pet, petkey) =>
                    (pet[1]?.toLowerCase().includes(search.toLowerCase()) ||
                      search == null) &&
                    pet[6] === "TRUE" && (
                      <section
                        key={petkey}
                        className={`h-20 w-full flex items-center px-3 bg-neutral-800 rounded ${getPetColor(
                          pet[3],
                          petCategories
                        )}`}
                      >
                        <div className="flex-none overflow-hidden truncate px-2 w-2/12">
                          {pet[1]}
                        </div>
                        <div className="flex-none overflow-hidden truncate px-2 w-3/12">
                          {pet[2]}
                        </div>
                        <div className="flex-none overflow-hidden truncate px-2 w-2/12">
                          {pet[3]}
                        </div>
                        <div className="flex-none overflow-hidden truncate px-2 w-5/12 flex justify-end gap-1">
                          <FormModal
                            button={
                              <TableButton>
                                <FaRegStar />
                              </TableButton>
                            }
                          >
                            <UpdateStatus
                              fetchOnFinish={() => getGoogleSheetData()}
                              entry={{
                                ID: pet[0],
                                Name: pet[1],
                                Title: pet[2],
                                Type: pet[3],
                                Image: pet[4],
                                Lore: pet[5],
                              }}
                            ></UpdateStatus>
                          </FormModal>
                          <FormModal
                            button={
                              <TableButton>
                                <TbEditCircle />
                              </TableButton>
                            }
                          >
                            <EditPet
                              fetchOnFinish={() => getGoogleSheetData()}
                              entry={{
                                ID: pet[0],
                                Name: pet[1],
                                Title: pet[2],
                                Type: pet[3],
                                Image: pet[4],
                                Lore: pet[5],
                              }}
                            ></EditPet>
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
                                  <AddTrait
                                    fetchOnFinish={() => getGoogleSheetData()}
                                    ID={pet[0]}
                                  ></AddTrait>
                                </FormModal>
                                <FormModal
                                  button={
                                    <TableButton>
                                      <PiTarget />
                                    </TableButton>
                                  }
                                >
                                  <AddSkill
                                    fetchOnFinish={() => getGoogleSheetData()}
                                    ID={pet[0]}
                                  ></AddSkill>
                                </FormModal>
                              </>
                            }
                          >
                            <PetDetails pet={pet}>
                              <PeteffectEffect
                                isAdmin={true}
                                fetchOnFinish={() => getGoogleSheetData()}
                                api={"update_traits"}
                                title={"Traits"}
                                effects={getCubiodsEffect(petTraits, 1, pet[0])}
                              ></PeteffectEffect>
                              <PeteffectEffect
                                isAdmin={true}
                                fetchOnFinish={() => getGoogleSheetData()}
                                api={"update_skills"}
                                title={"Skills"}
                                effects={getCubiodsEffect(petSkills, 1, pet[0])}
                              ></PeteffectEffect>
                            </PetDetails>
                          </InformationModal>
                        </div>
                      </section>
                    )
                )}
              </>
            )}
          </main>
        </main>
      </section>
    </main>
  );
}

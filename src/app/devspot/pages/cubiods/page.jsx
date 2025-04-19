"use client";

import { useEffect, useState } from "react";
import { TbEditCircle } from "react-icons/tb";
import { FaRegStar } from "react-icons/fa";
import AddPet from "../../../forms/AddPet";
import FormModal from "../../../../components/single/modal/FormModal";
import UpdateStatus from "../../../forms/UpdateStatus";
import EditPet from "../../../forms/EditPet";

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
    <main className="flex flex-col gap-5">
      {/* [ABOUT] Description and Introduction of the Table */}
      <header>
        <h1 className="text-4xl text-red-400">Cubiods</h1>
        <p className="w-1/2 text-neutral-500">Description about the table</p>
      </header>

      {/* [ABOUT] Functionalities like Adding of Entries */}
      <section className="flex gap-3 justify-end">
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
      </section>

      {/* [ABOUT] The Table holding the list of Entries */}
      <section>
        <main>
          <header className="mb-3">
            <section className="flex p-3 bg-neutral-100 border border-neutral-300 rounded text-sm">
              <div className="flex-none overflow-hidden text-nowrap text-clip w-1/12">
                ID
              </div>
              <div className="flex-none overflow-hidden text-nowrap text-clip w-2/12">
                Name
              </div>
              <div className="flex-none overflow-hidden text-nowrap text-clip w-2/12">
                Title
              </div>
              <div className="flex-none overflow-hidden text-nowrap text-clip w-2/12">
                Type
              </div>
              <div className="flex-none overflow-hidden text-nowrap text-clip w-3/12">
                Lore
              </div>
              <div className="flex-none overflow-hidden text-nowrap text-clip w-1/12">
                Image
              </div>
              <div className="flex-none overflow-hidden text-nowrap text-clip w-1/12 text-end">
                Action
              </div>
            </section>
          </header>
          <main className="flex flex-col gap-2">
            {pets?.map(
              (pet, petkey) =>
                (pet[1]?.toLowerCase().includes(search.toLowerCase()) ||
                  search == null) &&
                pet[6] === "TRUE" && (
                  <section
                    key={petkey}
                    className="flex items-center py-5 px-3 bg-white border border-neutral-300 rounded text-sm"
                  >
                    <div className="flex-none overflow-hidden text-nowrap text-clip w-1/12">
                      {pet[0]}
                    </div>
                    <div className="flex-none overflow-hidden text-nowrap text-clip w-2/12">
                      {pet[1]}
                    </div>
                    <div className="flex-none overflow-hidden text-nowrap text-clip w-2/12">
                      {pet[2]}
                    </div>
                    <div className="flex-none overflow-hidden text-nowrap text-clip w-2/12">
                      {pet[3]}
                    </div>
                    <div className="flex-none overflow-hidden text-nowrap text-clip w-3/12">
                      {pet[5]}
                    </div>
                    <div className="flex-none overflow-hidden text-nowrap text-clip w-1/12">
                      {pet[4]}
                    </div>
                    <div className="flex-none overflow-hidden text-nowrap text-clip w-1/12 flex justify-end gap-1">
                      <FormModal
                        button={
                          <div className="size-8 flex justify-center items-center text-lg rounded-full bg-neutral-300 hover:bg-neutral-400 shadow-sm text-neutral-800">
                            <FaRegStar />
                          </div>
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
                          <div className="size-8 flex justify-center items-center text-lg rounded-full bg-neutral-300 hover:bg-neutral-400 shadow-sm text-neutral-800">
                            <TbEditCircle />
                          </div>
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
                    </div>
                  </section>
                )
            )}
          </main>
        </main>
      </section>
    </main>
  );
}

/*  <CubiodsContent
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
                buttons={
                  <>
                    {secret && secret === "foodguy05" && (
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
                    )}
                  </>
                }
              >
                <PetTraitDetails traits={pet.Traits}></PetTraitDetails>
                <PetSkillDetails skills={pet.Skills}></PetSkillDetails>
              </PetInformation>
            )
        )}
      </Suspense>
    </CubiodsContent> */

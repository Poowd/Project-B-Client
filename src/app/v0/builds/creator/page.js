"use client";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useTransition } from "react";
import {
  specialtyList,
  SpecialtyOptions,
  specimenList,
  SpecimenOptions,
} from "../../../../components/listbox/ListBoxOptions";
import { useRouter } from "next/navigation";
import BasicInput1 from "../../../../components/input/BasicInput1";
import BasicTextArea1 from "../../../../components/input/BasicTextArea1";
import BasicListBox1 from "../../../../components/listbox/BasicListBox1";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { key, url } from "../../../config";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Page() {
  const router = useRouter();
  const [file, setFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [cuboid, setCuboid] = useState({
    ign: "",
    name: "",
    title: "",
    tag: "",
    creature: "",
    specimen: specimenList[0].type,
    specialty: specialtyList[0],
    color: "",
    skills: [],
    trait: {
      name: "",
      level: 0,
      description: "",
    },
    head: "eyJ0ZXh0dXJlcyI6eyJTS0lOIjp7InVybCI6Imh0dHA6Ly90ZXh0dXJlcy5taW5lY3JhZnQubmV0L3RleHR1cmUvNjVkYzg1YjI1MWZhMTYyZTkyMDc1ODc2YWE4YzMwYjY4NThiMjM0NzUxMDM3MmQyYTNiNzc3MWZmYzFjZmEyNSJ9fX0=",
    image:
      "https://images.minecraft-heads.com/render3d/head/0c/0cac7d16f350b11c98ccd222d4f0bf43.webp",
    lore: "",
  });

  const notEmpty = (var1) => {
    if (var1 !== "" && var1 !== null && var1 !== undefined) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    const extractFileType = file?.name
      ?.substring(file?.name?.indexOf(".") + 1)
      .toLowerCase();
    setCuboid((prev) => ({
      ...prev,
      image: uuidv4().concat(`.${extractFileType}`),
    }));
  }, [file]);

  const hidden = createClient(url, key);
  async function uploadFile(e) {
    const imageFile = file;
    const { error } = await hidden.storage
      .from("images")
      .upload(cuboid.image, imageFile);
    console(JSON.stringify(file));
    if (error) {
      console.log(error);
      alert(error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (
        notEmpty(cuboid.name) &&
        notEmpty(cuboid.title) &&
        notEmpty(cuboid.specimen) &&
        notEmpty(cuboid.specialty) &&
        notEmpty(cuboid.head) &&
        notEmpty(cuboid.image) &&
        notEmpty(cuboid.lore)
      ) {
        try {
          const response = await fetch("../../../api/e0/savePet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cuboid),
          });

          // Parse the response content
          const res = await response.json();
          uploadFile();
          console.log(res);
          window.location.reload();
          return;
        } catch (error) {
          console.log(error);
        }
      }
    });
    return;
  };

  return (
    <main id="create" className="w-full p-5 md:p-10 scroll-smooth">
      <header className="w-full mb-5 border-b border-neutral-800 flex gap-10 pb-2">
        <div className="flex-1">
          <p className={`mb-2.5`}>Create your own</p>
          <h1 className={`text-4xl font-bold mb-2.5`}>Cubiods!</h1>
          <h3 className="text-xl"></h3>
        </div>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="w-full h-fit border border-neutral-900 rounded-2xl">
          <section className="flex flex-col gap-5">
            <div className="border border-neutral-700 p-5 rounded-lg flex flex-col md:flex-row gap-5">
              <div className="flex-1 flex gap-5">
                {previewUrl && (
                  <Image
                    alt="..."
                    className="size-24 object-cover object-center"
                    width={0}
                    height={0}
                    src={previewUrl}
                  ></Image>
                )}
                <div className="flex-1">
                  <BasicInput1
                    name={"Image"}
                    label={"Image"}
                    description={"What is your pet's image URL?"}
                    type={"file"}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFile(file);
                        const reader = new FileReader();
                        reader.onload = () => {
                          setPreviewUrl(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    required={true}
                    accept="image/jpg, image/jpeg, image/png"
                  >
                    Image
                  </BasicInput1>
                </div>
              </div>
              <div className="flex-1">
                <BasicInput1
                  name={"In-Game Name"}
                  label={"In-Game Name"}
                  description={
                    "If your entry is released you'll receive rewards in-game."
                  }
                  value={cuboid.ign}
                  onChange={(e) => {
                    setCuboid((prev) => ({
                      ...prev,
                      ign: e.target.value,
                    }));
                  }}
                ></BasicInput1>
              </div>
            </div>

            <div className="border border-neutral-700 p-5 rounded-lg flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-5 md:gap-10">
                <div className="flex-1">
                  <BasicInput1
                    name={"Name"}
                    label={"Name"}
                    description={"What is your pet's name?"}
                    value={cuboid.name}
                    onChange={(e) => {
                      setCuboid((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                  ></BasicInput1>
                </div>
                <div className="flex-1">
                  <BasicInput1
                    name={"Title"}
                    label={"Title"}
                    description={"What is your pet's title?"}
                    value={cuboid.title}
                    onChange={(e) => {
                      setCuboid((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }));
                    }}
                  ></BasicInput1>
                </div>
                <div className="flex-1">
                  <BasicInput1
                    name={"Creature"}
                    label={"Creature"}
                    description={"What is your pet's creature?"}
                    value={cuboid.creature}
                    onChange={(e) => {
                      setCuboid((prev) => ({
                        ...prev,
                        creature: e.target.value,
                      }));
                    }}
                  ></BasicInput1>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5 md:gap-10">
                <div className="flex-1">
                  <BasicListBox1
                    label={"Specimen"}
                    description={"Select your pet's specimen type."}
                    value={cuboid.specimen}
                    onChange={(value) => {
                      const specimenData = specimenList.find(
                        (s) => s.type === value
                      );
                      setCuboid({
                        ...cuboid,
                        specimen: specimenData.type,
                        skills: specimenData.skills,
                        color: specimenData.color,
                      });
                    }}
                    options={SpecimenOptions}
                  ></BasicListBox1>
                </div>
                <div className="flex-1">
                  <BasicListBox1
                    label={"Specialty"}
                    description={"What is your pet's specialty?"}
                    value={cuboid.specialty}
                    onChange={(value) => {
                      const specialtyData = specialtyList.find(
                        (s) => s === value
                      );
                      setCuboid({
                        ...cuboid,
                        specialty: specialtyData,
                      });
                    }}
                    options={SpecialtyOptions}
                  ></BasicListBox1>
                </div>
                <div className="flex-1">
                  <BasicInput1
                    name={"Tag"}
                    label={"Tag"}
                    description={"What is your pet's tag?"}
                    value={cuboid.tag}
                    onChange={(e) => {
                      setCuboid((prev) => ({
                        ...prev,
                        tag: e.target.value,
                      }));
                    }}
                  ></BasicInput1>
                </div>
              </div>
            </div>
            <div className="border border-neutral-700 p-5 rounded-lg flex flex-col gap-5">
              <div>
                <h3 className="text-lg text-neutral-600">{`Pet Trait`}</h3>
                <section className="mb-2.5 flex flex-col md:flex-row gap-2.5">
                  <div className="flex-1/6">
                    <BasicInput1
                      name={"Trait-Name"}
                      label={"Trait-Name"}
                      description={"What is your pet's trait name?"}
                      value={cuboid.trait.name}
                      onChange={(e) => {
                        setCuboid((prev) => ({
                          ...prev,
                          trait: {
                            ...prev.trait,
                            name: e.target.value,
                          },
                        }));
                      }}
                    ></BasicInput1>
                  </div>
                  <div className="flex-1/6">
                    <BasicInput1
                      name={"Trait-Level"}
                      label={"Trait-Level"}
                      description={"What is your pet's trait level?"}
                      value={cuboid.trait.level}
                      onChange={(e) => {
                        setCuboid((prev) => ({
                          ...prev,
                          trait: {
                            ...prev.trait,
                            level: e.target.value,
                          },
                        }));
                      }}
                    ></BasicInput1>
                  </div>
                  <div className="flex-4/6">
                    <BasicInput1
                      name={"Trait-Description"}
                      label={"Trait-Description"}
                      description={"What is your pet's trait description?"}
                      value={cuboid.trait.description}
                      onChange={(e) => {
                        setCuboid((prev) => ({
                          ...prev,
                          trait: {
                            ...prev.trait,
                            description: e.target.value,
                          },
                        }));
                      }}
                    ></BasicInput1>
                  </div>
                </section>
              </div>
              <div>
                <h3 className="text-lg text-neutral-600">{`Pet Skill/s`}</h3>
                <div>
                  {cuboid.skills.length < 1 && (
                    <p className="flex items-center gap-2.5">
                      <span className="text-neutral-600">{">>"}</span>
                      <span>The Pet has no skills.</span>
                    </p>
                  )}
                  {cuboid.skills.map((skill, index) => (
                    <section
                      key={index}
                      className="mb-5 flex flex-col md:flex-row gap-2.5 border-b border-neutral-800 pb-5"
                    >
                      <div className="flex-1/6">
                        <BasicInput1
                          name={"Skill-Name"}
                          label={"Skill-Name"}
                          description={"What is your pet's skill name?"}
                          value={skill[index]?.name}
                          onChange={(e) => {
                            setCuboid((prev) => ({
                              ...prev,
                              skills: [
                                ...prev.skills.slice(0, index),
                                {
                                  ...prev.skills[index],
                                  name: e.target.value,
                                },
                                ...prev.skills.slice(index + 1),
                              ],
                            }));
                          }}
                        ></BasicInput1>
                      </div>
                      <div className="flex-1/6">
                        <BasicInput1
                          name={"Skill-Level"}
                          label={"Skill-Level"}
                          description={"What is your pet's skill level?"}
                          value={skill[index]?.level}
                          onChange={(e) => {
                            setCuboid((prev) => ({
                              ...prev,
                              skills: [
                                ...prev.skills.slice(0, index),
                                {
                                  ...prev.skills[index],
                                  level: e.target.value,
                                },
                                ...prev.skills.slice(index + 1),
                              ],
                            }));
                          }}
                        ></BasicInput1>
                      </div>
                      <div className="flex-4/6">
                        <BasicInput1
                          name={"Skill-Description"}
                          label={"Skill-Description"}
                          description={"What is your pet's skill description?"}
                          value={skill[index]?.description}
                          onChange={(e) => {
                            setCuboid((prev) => ({
                              ...prev,
                              skills: [
                                ...prev.skills.slice(0, index),
                                {
                                  ...prev.skills[index],
                                  description: e.target.value,
                                },
                                ...prev.skills.slice(index + 1),
                              ],
                            }));
                          }}
                        ></BasicInput1>
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
            <div className="border border-neutral-700 p-5 rounded-lg flex flex-col gap-5">
              <BasicTextArea1
                name={"Lore"}
                label={"Lore"}
                description={"What is your pet's lore?"}
                value={cuboid.lore || ""}
                onChange={(e) => {
                  setCuboid((prev) => ({
                    ...prev,
                    lore: e.target.value,
                  }));
                }}
              ></BasicTextArea1>
              <div className="border border-neutral-600 text-neutral-600 rounded-lg py-2 px-4 text-sm mb-2.5 hover:cursor-pointer hover:border-neutral-400 hover:text-neutral-400">
                {cuboid.name &&
                cuboid.title &&
                cuboid.creature &&
                cuboid.trait.name ? (
                  <Link
                    href={`https://you.com/search?q=${`Hey, can you make a creative lore about a specific pet? Below are the specifications:\nName: ${cuboid.name} ( ${cuboid.title} )\nCreature: ${cuboid.creature}\nTrait: ${cuboid.trait.name}`.replace(
                      /\s/g,
                      "%20"
                    )}&fromSearchBar=true&chatMode=default`}
                    target="_blank"
                  >
                    <h3 className="font-bold">Generate using AI</h3>
                    <p className="italic text-xs">Click to Generate</p>
                  </Link>
                ) : (
                  <>
                    <h3 className="font-bold">
                      Fill in all the following fields to Generate:
                    </h3>
                    <div className="flex gap-2.5">
                      <p>{cuboid.name || "> Name"}</p>
                      <p>{cuboid.title || "> Title"}</p>
                      <p>{cuboid.creature || "> Creature"}</p>
                      <p>{cuboid.trait.name || "> Trait"}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="border border-neutral-700 p-5 rounded-lg flex flex-col gap-5">
              <BasicTextArea1
                name={"Head"}
                label={"Head"}
                description={"What is your pet's head icon in-game?"}
                value={cuboid.head}
                onChange={(e) => {
                  setCuboid((prev) => ({
                    ...prev,
                    head: e.target.value,
                  }));
                }}
              ></BasicTextArea1>
            </div>
          </section>
        </div>
        <div>
          <button
            type="submit"
            className="mt-5 w-full py-3 px-5 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit Cubiod"}
          </button>
        </div>
      </form>
    </main>
  );
}

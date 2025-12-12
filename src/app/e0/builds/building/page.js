"use client";

import { v4 as uuidv4 } from "uuid";
import { useEffect, useState, useTransition } from "react";
import {
  RewardTypeOptions,
  rewardTypesList,
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
import { createClient } from "@supabase/supabase-js";
import { key, url } from "../../../config";

export default function Page() {
  const router = useRouter();
  const [file, setFile] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [cuboid, setCuboid] = useState({
    ign: "",
    title: "",
    subtitle: "",
    startDate: "",
    endDate: "",
    code: "",
    rewards: [],
    image: "",
    description: "",
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
    console.log(JSON.stringify(file));
    alert(JSON.stringify(file));
    if (error) {
      console.log(error);
      alert(error.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (
        notEmpty(cuboid.title) &&
        notEmpty(cuboid.subtitle) &&
        notEmpty(cuboid.startDate) &&
        notEmpty(cuboid.endDate) &&
        notEmpty(cuboid.code) &&
        notEmpty(cuboid.image) &&
        notEmpty(cuboid.description)
      ) {
        try {
          const response = await fetch("../../../api/e0/saveBuild", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cuboid),
          });

          // Parse the response content
          const res = await response.json();
          console.log(res);
          if (res.status) {
            await uploadFile();
            setCuboid({
              ign: "",
              title: "",
              subtitle: "",
              startDate: "",
              endDate: "",
              code: "",
              rewards: [],
              image: "",
              description: "",
            });
          }
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
          <p className={`mb-2.5`}>Suggest a perfect</p>
          <h1 className={`text-4xl font-bold mb-2.5`}>Build Competition!</h1>
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
                    name={"Title"}
                    label={"Title"}
                    description={""}
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
                    name={"Subtitle"}
                    label={"Subtitle"}
                    description={""}
                    value={cuboid.subtitle}
                    onChange={(e) => {
                      setCuboid((prev) => ({
                        ...prev,
                        subtitle: e.target.value,
                      }));
                    }}
                  ></BasicInput1>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5 md:gap-10">
                <div className="flex-1">
                  <BasicInput1
                    name={"Start Date"}
                    label={"Start Date"}
                    type={"date"}
                    description={""}
                    value={cuboid.startDate}
                    onChange={(e) => {
                      const dateValue = e.target.value;
                      const formattedDate = dateValue.replace(
                        /(\d{2})\/(\d{2})\/(\d{4})/,
                        "$1/$2/$3"
                      );
                      setCuboid((prev) => ({
                        ...prev,
                        startDate: formattedDate,
                      }));
                    }}
                  ></BasicInput1>
                </div>
                <div className="flex-1">
                  <BasicInput1
                    name={"End Date"}
                    label={"End Date"}
                    type={"date"}
                    description={""}
                    value={cuboid.endDate}
                    onChange={(e) => {
                      const dateValue = e.target.value;
                      const formattedDate = dateValue.replace(
                        /(\d{2})\/(\d{2})\/(\d{4})/,
                        "$1/$2/$3"
                      );
                      setCuboid((prev) => ({
                        ...prev,
                        endDate: formattedDate,
                      }));
                    }}
                  ></BasicInput1>
                </div>
                <div className="flex-1">
                  <BasicInput1
                    name={"Code"}
                    label={"Code"}
                    description={""}
                    value={cuboid.code}
                    onChange={(e) => {
                      const dateValue = e.target.value;
                      const formattedDate = dateValue.replace(
                        /(\d{2})\/(\d{2})\/(\d{4})/,
                        "$3-$1-$2"
                      );
                      setCuboid((prev) => ({
                        ...prev,
                        code: formattedDate,
                      }));
                    }}
                  ></BasicInput1>
                </div>
              </div>
            </div>
            <div className="border border-neutral-700 p-5 rounded-lg flex flex-col gap-5">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-lg text-neutral-600">{`Reward/s`}</h3>
                  <p
                    className="hover:cursor-pointer text-sm"
                    onClick={() =>
                      setCuboid((prev) => ({
                        ...prev,
                        rewards: [
                          ...prev.rewards,
                          { reward: "", value: 0, type: "" },
                        ],
                      }))
                    }
                  >
                    Add Rewards
                  </p>
                </div>
                <div>
                  {cuboid.rewards.map((reward, index) => (
                    <section
                      key={index}
                      className="mb-5 flex flex-col md:flex-row gap-2.5 border-b border-neutral-800 pb-5"
                    >
                      <div className="flex-1/6">
                        <BasicInput1
                          name={"Reward"}
                          label={"Reward"}
                          value={reward[index]?.reward}
                          onChange={(e) => {
                            setCuboid((prev) => ({
                              ...prev,
                              rewards: [
                                ...prev.rewards.slice(0, index),
                                {
                                  ...prev.rewards[index],
                                  reward: e.target.value,
                                },
                                ...prev.rewards.slice(index + 1),
                              ],
                            }));
                          }}
                        ></BasicInput1>
                      </div>
                      <div className="flex-1/6">
                        <BasicInput1
                          name={"Value"}
                          label={"Value"}
                          value={reward[index]?.value}
                          onChange={(e) => {
                            setCuboid((prev) => ({
                              ...prev,
                              rewards: [
                                ...prev.rewards.slice(0, index),
                                {
                                  ...prev.rewards[index],
                                  value: e.target.value,
                                },
                                ...prev.rewards.slice(index + 1),
                              ],
                            }));
                          }}
                        ></BasicInput1>
                      </div>
                      <div className="flex-4/6">
                        <BasicListBox1
                          label={"Type"}
                          value={cuboid.rewards[index]?.type}
                          onChange={(value) => {
                            setCuboid({
                              ...cuboid,
                              rewards: [
                                ...cuboid.rewards.slice(0, index),
                                {
                                  ...cuboid.rewards[index],
                                  type: value,
                                },
                                ...cuboid.rewards.slice(index + 1),
                              ],
                            });
                          }}
                          options={RewardTypeOptions}
                        ></BasicListBox1>
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
            <div className="border border-neutral-700 p-5 rounded-lg flex flex-col gap-5">
              <BasicTextArea1
                name={"Description"}
                label={"Description"}
                description={""}
                value={cuboid.description || ""}
                onChange={(e) => {
                  setCuboid((prev) => ({
                    ...prev,
                    description: e.target.value,
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

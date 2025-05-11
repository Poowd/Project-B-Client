"use client";

import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import PetForms from "../../components/package/PetForms";
import LabeledInput from "./input/LabeledInput";
import LabeledTextAreaInput from "./input/LabeledTextAreaInput";

export default function AddBuildEntry({ fetchOnFinish, ID }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();

  const [data, setData] = useState({
    Title: "",
    Team: "",
    Members: "",
    Description: "",
    Image: "None",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const response = await fetch("/api/add_buildentry", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              row: [
                uuidv4(),
                ID,
                data.Team,
                data.Members,
                data.Title,
                data.Description,
                data.Image,
                "TRUE",
              ],
            }),
          });

          // Parse the response content
          const res = await response.json();

          console.log(res);
          fetchOnFinish();

          close();
          return;
        } catch (error) {
          console.log(error);
        }
      }
    });
    return;
  };

  return (
    <PetForms
      handleSubmit={handleSubmit}
      title={"Add Build Entry"}
      isPending={isPending}
    >
      <LabeledInput
        label={"Title"}
        id={"Title"}
        required={true}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>

      <LabeledInput
        label={"Team"}
        id={"Team"}
        required={true}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>

      <LabeledTextAreaInput
        label={"Members"}
        id={"Members"}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
        required={true}
      ></LabeledTextAreaInput>

      <LabeledInput
        label={"Image"}
        id={"Image"}
        required={true}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>

      <LabeledTextAreaInput
        label={"Description"}
        id={"Description"}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
        required={true}
      ></LabeledTextAreaInput>
    </PetForms>
  );
}

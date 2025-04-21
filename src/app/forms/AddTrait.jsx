"use client";

import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import PetForms from "../../components/package/PetForms";
import LabeledInput from "./input/LabeledInput";
import LabeledTextAreaInput from "./input/LabeledTextAreaInput";

export default function AddTrait({ fetchOnFinish, ID }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState(null);

  const [data, setData] = useState({
    Trait: "",
    Level: "",
    Description: "",
  });

  useEffect(() => {
    setData((prev) => ({ ...prev, Image: file?.name }));
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const response = await fetch("/api/add_trait", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              row: [
                uuidv4(),
                ID,
                data.Trait,
                data.Level,
                data.Description,
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
      title={"Add Trait"}
      isPending={isPending}
    >
      <LabeledInput
        label={"Trait"}
        id={"Trait"}
        required={true}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
      <LabeledInput
        label={"Level"}
        id={"Level"}
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

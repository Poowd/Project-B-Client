"use client";

import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import LabeledInput from "./input/LabeledInput";
import LabeledTextAreaInput from "./input/LabeledTextAreaInput";
import PetForms from "../../components/package/PetForms";

export default function EditEffect({ fetchOnFinish, entry, api }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();

  const [data, setData] = useState({
    ID: "",
    Pet: "",
    Effect: "",
    Level: "",
    Description: "",
  });

  useEffect(() => {
    setData(entry);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const response = await fetch(`/../api/${api}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: data.ID, // match column A
              updatedValues: [
                data.Pet,
                data.Effect,
                data.Level,
                data.Description,
              ],
              startCol: 1, // column B is index 1
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
      title={"Modify Pet Effect"}
      isPending={isPending}
    >
      <LabeledInput
        label={"Effect"}
        id={"Effect"}
        required={true}
        value={data?.Effect}
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
        value={data?.Level}
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
        value={data?.Description}
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

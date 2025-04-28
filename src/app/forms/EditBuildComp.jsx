"use client";

import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import LabeledInput from "./input/LabeledInput";
import LabeledTextAreaInput from "./input/LabeledTextAreaInput";
import PetForms from "../../components/package/PetForms";

export default function EditBuildComp({ fetchOnFinish, entry }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();

  const [data, setData] = useState({
    ID: "",
    Title: "",
    Subtitle: "",
    Start: "",
    End: "",
    Description: "",
    Image: "",
  });

  useEffect(() => {
    setData(entry);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const response = await fetch(`/../api/update_buildcomp`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: data.ID, // match column A
              updatedValues: [
                data.Title,
                data.Subtitle,
                data.Start,
                data.End,
                data.Description,
                data.Image,
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
      title={"Modify Build Competition"}
      isPending={isPending}
    >
      <LabeledInput
        label={"Title"}
        id={"Title"}
        value={data?.Title}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
      <LabeledInput
        label={"Subtitle"}
        id={"Subtitle"}
        value={data?.Subtitle}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
      <LabeledInput
        label={"Start"}
        id={"Start"}
        value={data?.Start}
        type={"date"}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
      <LabeledInput
        label={"End"}
        id={"End"}
        value={data?.End}
        type={"date"}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
      <LabeledInput
        label={"Image"}
        id={"Image"}
        value={data?.Image}
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

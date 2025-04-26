"use client";

import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import PetForms from "../../components/package/PetForms";
import LabeledInput from "./input/LabeledInput";
import { colors } from "../../hooks/data/colors";

export default function AddTags({ fetchOnFinish, totalPets }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState(null);

  const [data, setData] = useState({
    Tag: "",
  });

  useEffect(() => {
    setData((prev) => ({ ...prev, Image: file?.name }));
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const response = await fetch("/api/add_tags", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              row: [uuidv4(), data.Tag, "TRUE"],
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
      title={"Add Tag"}
      isPending={isPending}
    >
      <LabeledInput
        label={"Tag"}
        id={"Tag"}
        required={true}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
    </PetForms>
  );
}

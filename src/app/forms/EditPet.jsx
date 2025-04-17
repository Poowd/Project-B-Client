"use client";

import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import LabeledFileInput from "./input/LabeledFileInput";
import LabeledInput from "./input/LabeledInput";
import LabeledTextAreaInput from "./input/LabeledTextAreaInput";
import PetForms from "@/components/package/PetForms";

export default function EditPet({ fetchOnFinish, entry }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState(null);

  const [data, setData] = useState({
    ID: "",
    Name: "",
    Title: "",
    Type: "",
    Lore: "",
    Image: "",
  });

  useEffect(() => {
    setData(entry);
  }, []);

  useEffect(() => {
    setData((prev) => ({ ...prev, Image: file?.name || entry.Image }));
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const something = new FormData();
          something.set("file", file);

          // const upres = await fetch(`/../api/upload`, {
          //   method: "POST",
          //   body: something,
          // });

          const response = await fetch(`/../api/edit_pets`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ID: data.ID,
              Name: data.Name,
              Title: data.Title,
              Type: data.Type,
              Lore: data.Lore,
              Image: data.Image,
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
      title={"Modify Pet"}
      isPending={isPending}
    >
      <LabeledInput
        label={"Name"}
        id={"Name"}
        value={data?.Name}
        placeholder={data?.Name}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
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
        label={"Type"}
        id={"Type"}
        value={data?.Type}
        onChange={(e) =>
          setData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
          }))
        }
      ></LabeledInput>
      <LabeledFileInput
        label={"Image"}
        id={"Image"}
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.readAsDataURL(file);
          }
        }}
      ></LabeledFileInput>

      <LabeledTextAreaInput
        label={"Lore"}
        id={"Lore"}
        value={data?.Lore}
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

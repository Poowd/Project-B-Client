"use client";
import { v4 as uuidv4 } from "uuid";
import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import LabeledFileInput from "./input/LabeledFileInput";
import { createClient } from "@supabase/supabase-js";
import LabeledInput from "./input/LabeledInput";
import LabeledTextAreaInput from "./input/LabeledTextAreaInput";
import PetForms from "@/components/package/PetForms";

const supabase = createClient(
  "https://jxqnhgenpsqzghroiiuy.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4cW5oZ2VucHNxemdocm9paXV5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTY5ODM0NSwiZXhwIjoyMDU1Mjc0MzQ1fQ.QILMuzRIVJDp2NSDqjhuru2Y2CFJ_zGMOdvZo9K8E60"
);

export default function AddPet({ onSubmitCommand }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState(null);

  const [name, setName] = useState({
    value: null,
    style: "",
    text_style: "",
    message: null,
  });
  const [title, setTitle] = useState({
    value: null,
    style: "",
    text_style: "",
    message: null,
  });
  const [type, setType] = useState({
    value: null,
    style: "",
    text_style: "",
    message: null,
  });
  const [lore, setLore] = useState({
    value: null,
    style: "",
    text_style: "",
    message: null,
  });
  const [image, setImage] = useState({
    value: null,
    style: "",
    text_style: "",
    message: null,
  });

  useEffect(() => {
    const fileType = file?.type?.split("/");
    fileType &&
      setImage((prev) => ({
        ...prev,
        value: uuidv4().concat(`.${fileType[1]}`),
      }));
    console.log(image);
  }, [file]);

  async function uploadFile(e) {
    const imageFile = file;
    const { error } = await supabase.storage
      .from("images")
      .upload(image.value, imageFile);
    if (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (true) {
        try {
          const response = await fetch(`/../api/add_archetopia_pets`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Name: name.value,
              Title: title.value,
              Type: type.value,
              Lore: lore.value,
              Image: image.value,
            }),
          });

          // Parse the response content
          const res = await response.json();

          if (res.status === true) {
            uploadFile().then(() => {
              onSubmitCommand();
            });
            close();
            return;
          } else {
            console.log(res.status.details);
            return;
          }
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
      title={"Add Pet"}
      isPending={isPending}
    >
      <LabeledInput
        label={"Name"}
        style={name.style}
        id={"name"}
        onChange={(e) =>
          setName((value) => ({ ...value, value: e.target.value }))
        }
      ></LabeledInput>
      <LabeledInput
        label={"Title"}
        style={title.style}
        id={"title"}
        onChange={(e) =>
          setTitle((value) => ({ ...value, value: e.target.value }))
        }
      ></LabeledInput>
      <LabeledInput
        label={"Type"}
        style={type.style}
        id={"type"}
        onChange={(e) =>
          setType((value) => ({ ...value, value: e.target.value }))
        }
      ></LabeledInput>
      <LabeledFileInput
        label={"Image"}
        style={image.style}
        id={"image"}
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
        style={lore.style}
        id={"lore"}
        onChange={(e) =>
          setLore((value) => ({ ...value, value: e.target.value }))
        }
        required={true}
      ></LabeledTextAreaInput>
    </PetForms>
  );
}

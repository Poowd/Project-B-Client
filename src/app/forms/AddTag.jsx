"use client";

import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import PetForms from "../../components/package/PetForms";
import LabeledInput from "./input/LabeledInput";
import LabeledTextAreaInput from "./input/LabeledTextAreaInput";

export default function AddTag({ fetchOnFinish, ID, tags, tag }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();
  const [checkedTags, setCheckedTags] = useState([]);
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
      if (checkedTags.length > 0) {
        try {
          checkedTags.forEach(async (tag) => {
            const response = await fetch("/api/add_tag", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                row: [uuidv4(), ID, tag, "TRUE"],
              }),
            });

            // Parse the response content
            const res = await response.json();
            console.log(res);
          });

          fetchOnFinish();

          close();
          return;
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("No Selected Tag/s");
      }
    });
    return;
  };

  const doesExist = (item) => {
    for (let i = 0; i < tag.length; i++) {
      const currentTag = tag[i];

      if (currentTag[2] === item) {
        return false;
      }
    }
    return true;
  };

  const removeCommonElements = () => {
    let tempArray = [];

    tags.forEach((tag) => {
      if (doesExist(tag[1])) {
        tempArray.push(tag[1]);
      }
    });

    return tempArray;
  };

  const handleCheckboxChange = (tag) => {
    setCheckedTags((prev) => [...prev, tag]);
  };

  useEffect(() => {
    console.log(checkedTags);
  }, [checkedTags]);

  return (
    <PetForms
      handleSubmit={handleSubmit}
      title={"Add Tag"}
      isPending={isPending}
    >
      {removeCommonElements().length < 1 && (
        <p className="text-center py-3 border border-neutral-800 rounded">
          All Tags are used in this Pet.
        </p>
      )}
      {removeCommonElements().length > 0 &&
        removeCommonElements()?.map((tag, tagkey) => (
          <div key={tagkey} className="w-full flex gap-3">
            <input
              className=""
              type="checkbox"
              id={tagkey}
              name={tag}
              value={tag}
              onChange={(e) =>
                e.target.checked
                  ? handleCheckboxChange(tag)
                  : setCheckedTags((prev) => prev.filter((t) => t !== tag))
              }
            ></input>
            <label
              htmlFor={tagkey}
              className={`w-full border border-neutral-800 py-2 px-3`}
            >
              {tag}
            </label>
            <br />
          </div>
        ))}
    </PetForms>
  );
}

"use client";

import { useClose } from "@headlessui/react";
import { useEffect, useState, useTransition } from "react";
import { v4 as uuidv4 } from "uuid";
import PetForms from "../../components/package/PetForms";
import LabeledInput from "./input/LabeledInput";

export default function EvaluateBuild({ entry, code, fetchOnFinish }) {
  const close = useClose();
  const [isPending, startTransition] = useTransition();

  const [data, setData] = useState({
    Evaluator: "",
    Entry: entry,
    Code: code,
    Q1: 0,
    Q2: 0,
    Q3: 0,
    Q4: 0,
    Q5: 0,
    Q6: 0,
    Q7: 0,
    Q8: 0,
    Q9: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      const C1 = +data.Q1 + +data.Q2 + +data.Q3;
      const C2 = +data.Q4 + +data.Q5;
      const C3 = +data.Q6 + +data.Q7 + +data.Q8 + +data.Q9;

      if (true) {
        try {
          const response = await fetch("/api/evaluate_build", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              row: [
                uuidv4(),
                data.Evaluator,
                data.Entry,
                C1,
                C2,
                C3,
                data.Code,
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
      title={"Add Build Competition"}
      isPending={isPending}
    >
      <main>
        <section>
          <LabeledInput
            label={"Evaluator"}
            id={"Evaluator"}
            required={true}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
              }))
            }
          ></LabeledInput>
          <hr className="my-3 text-neutral-800" />
        </section>
      </main>

      <main>
        <header>
          <h3 className="font-semibold text-sm text-neutral-500">Exterior</h3>
        </header>
        <section className="flex flex-col gap-3">
          <LabeledInput
            label={"Complexity ( 15 )"}
            id={"Q1"}
            type={"number"}
            min={0}
            max={15}
            required={true}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
              }))
            }
          ></LabeledInput>
          <LabeledInput
            label={"Complementary ( 10 )"}
            id={"Q2"}
            type={"number"}
            min={0}
            max={10}
            required={true}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
              }))
            }
          ></LabeledInput>
          <LabeledInput
            label={"Creativity ( 10 )"}
            id={"Q3"}
            type={"number"}
            min={0}
            max={10}
            required={true}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
              }))
            }
          ></LabeledInput>
        </section>
      </main>

      <main>
        <header>
          <h3 className="font-semibold text-sm text-neutral-500">Interior</h3>
        </header>
        <section className="flex flex-col gap-3">
          <LabeledInput
            label={"Resourcefulness ( 15 )"}
            id={"Q4"}
            type={"number"}
            min={0}
            max={15}
            required={true}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
              }))
            }
          ></LabeledInput>
          <LabeledInput
            label={"Space Efficiency ( 20 )"}
            id={"Q5"}
            type={"number"}
            min={0}
            max={20}
            required={true}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
              }))
            }
          ></LabeledInput>
        </section>
      </main>

      <main>
        <header>
          <h3 className="font-semibold text-sm text-neutral-500">
            Terraforming / Environment
          </h3>
        </header>
        <section className="flex flex-col gap-3">
          <LabeledInput
            label={"Aesthetics ( 10 )"}
            id={"Q6"}
            type={"number"}
            min={0}
            max={10}
            required={true}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
              }))
            }
          ></LabeledInput>
          <LabeledInput
            label={"Natural ( 10 )"}
            id={"Q7"}
            type={"number"}
            min={0}
            max={10}
            required={true}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
              }))
            }
          ></LabeledInput>
          <LabeledInput
            label={"Ambiance ( 5 )"}
            id={"Q8"}
            type={"number"}
            min={0}
            max={5}
            required={true}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
              }))
            }
          ></LabeledInput>
          <LabeledInput
            label={"Accessibility ( 5 )"}
            id={"Q9"}
            type={"number"}
            min={0}
            max={5}
            required={true}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                [e.target.id]: e.target.value,
              }))
            }
          ></LabeledInput>
        </section>
      </main>
    </PetForms>
  );
}

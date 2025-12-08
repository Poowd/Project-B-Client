"use client";

import { useEffect, useState, useTransition } from "react";
import { PetsOptions } from "../../../../components/listbox/ListBoxOptions";
import { useRouter } from "next/navigation";
import BasicInput1 from "../../../../components/input/BasicInput1";
import BasicTextArea1 from "../../../../components/input/BasicTextArea1";
import BasicListBox1 from "../../../../components/listbox/BasicListBox1";
import RatingInput1 from "../../../../components/input/RatingInput1";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState({
    ign: "",
    target_pet: "All Pets",
    general_feedback: "",
    rating_1: "",
    rating_2: "",
    rating_3: "",
    rating_4: "",
    rating_5: "",
    notable_pet: "",
    pet_state: "",
  });
  const [petList, setPetList] = useState(null);

  const loadData = async () => {
    try {
      const response = await fetch(`../../../api/e0/optionPets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const fetchData = await response.json();
      setPetList(fetchData.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const notEmpty = (var1) => {
    if (var1 !== "" && var1 !== null && var1 !== undefined) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      if (notEmpty(feedback.ign)) {
        try {
          const response = await fetch("../../../api/e0/submitFeedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(feedback),
          });

          // Parse the response content
          const res = await response.json();
          console.log(res);
          window.location.reload();
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
          <p className={`mb-2.5`}>Create your own</p>
          <h1 className={`text-4xl font-bold mb-2.5`}>Cubiods!</h1>
          <h3 className="text-xl"></h3>
        </div>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="w-full h-fit border border-neutral-900 rounded-2xl">
          <section className="flex flex-col gap-5">
            <div className="border border-neutral-700 p-5 rounded-lg flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-5 md:gap-10">
                <div className="flex-1">
                  <BasicInput1
                    name={"In-Game Name"}
                    label={"In-Game Name"}
                    description={
                      "What is your in-game name? (Note: This is solely for reward purposes and will be anonymous to unauthorized staff.)"
                    }
                    value={feedback.ign}
                    onChange={(e) => {
                      setFeedback((prev) => ({
                        ...prev,
                        ign: e.target.value,
                      }));
                    }}
                  ></BasicInput1>
                </div>
                <div className="flex-1">
                  <BasicListBox1
                    label={"Targeted Pet"}
                    description={
                      "Select what pet are you providing feedback for, you may select all to apply to all existing pets or the system itself."
                    }
                    value={feedback.target_pet}
                    onChange={(e) => {
                      setFeedback((prev) => ({
                        ...prev,
                        target_pet: e,
                      }));
                    }}
                    options={PetsOptions(petList)}
                  ></BasicListBox1>
                </div>
              </div>
            </div>
            <div className="border border-neutral-700 p-5 rounded-lg flex flex-col gap-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex-1">
                  <RatingInput1
                    label={"Pet Experience"}
                    name={"Pet Experience"}
                    description={
                      "How would you rate your overall experience with this pet?"
                    }
                    value={feedback.rating_1}
                    onChange={(e) => {
                      setFeedback((prev) => ({
                        ...prev,
                        rating_1: parseInt(e.target.value),
                      }));
                    }}
                  />
                </div>
                <div className="flex-1">
                  <RatingInput1
                    label={"Pet Creativity"}
                    name={"Pet Creativity"}
                    description={
                      "How would you rate the creativity in each/the pet's design, details, and uniqueness?"
                    }
                    value={feedback.rating_2}
                    onChange={(e) => {
                      setFeedback((prev) => ({
                        ...prev,
                        rating_2: parseInt(e.target.value),
                      }));
                    }}
                  />
                </div>
                <div className="flex-1">
                  <RatingInput1
                    label={"Pet Skill"}
                    name={"Pet Skill"}
                    description={
                      "How would you rate the skill sets of each/the pet?"
                    }
                    value={feedback.rating_3}
                    onChange={(e) => {
                      setFeedback((prev) => ({
                        ...prev,
                        rating_3: parseInt(e.target.value),
                      }));
                    }}
                  />
                </div>
                <div className="flex-1">
                  <RatingInput1
                    label={"Pet Trait"}
                    name={"Pet Trait"}
                    description={
                      "How would you rate the trait sets of each/the pet?"
                    }
                    value={feedback.rating_4}
                    onChange={(e) => {
                      setFeedback((prev) => ({
                        ...prev,
                        rating_4: parseInt(e.target.value),
                      }));
                    }}
                  />
                </div>
                <div className="flex-1">
                  <RatingInput1
                    label={"Pet Lore"}
                    name={"Pet Lore"}
                    description={
                      "How would you rate the generated lores of each/the pet?"
                    }
                    value={feedback.rating_5}
                    onChange={(e) => {
                      setFeedback((prev) => ({
                        ...prev,
                        rating_5: parseInt(e.target.value),
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="border border-neutral-700 p-5 rounded-lg flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-5 md:gap-10">
                <div className="flex-1">
                  <BasicInput1
                    name={"Pet State"}
                    label={"Pet State"}
                    description={
                      "Are pets really effective in their current state? How do you feel about their performance and functionality? (Short Answer)"
                    }
                    value={feedback.pet_state}
                    onChange={(e) => {
                      setFeedback((prev) => ({
                        ...prev,
                        pet_state: e.target.value,
                      }));
                    }}
                  ></BasicInput1>
                </div>
                <div className="flex-1">
                  <BasicInput1
                    name={"Notable Pet"}
                    label={"Notable Pet"}
                    description={
                      "Which pet stood out to you the most and why? (Short Answer)"
                    }
                    value={feedback.notable_pet}
                    onChange={(e) => {
                      setFeedback((prev) => ({
                        ...prev,
                        notable_pet: e.target.value,
                      }));
                    }}
                  ></BasicInput1>
                </div>
              </div>
            </div>
            <div className="border border-neutral-700 p-5 rounded-lg flex flex-col gap-5">
              <BasicTextArea1
                name={"General Feedback"}
                label={"General Feedback"}
                description={"Provide your general feedback about the pets."}
                value={feedback.general_feedback || ""}
                onChange={(e) => {
                  setFeedback((prev) => ({
                    ...prev,
                    general_feedback: e.target.value,
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
            {isPending ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </form>
    </main>
  );
}

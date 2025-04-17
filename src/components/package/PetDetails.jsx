import LabeledContent1 from "../LabeledContent1";
import PetDetail from "../single/modal/PetDetail";

export default function PetDetails({ traits, pet }) {
  return (
    pet &&
    pet.map((pet, petkey) => (
      <main key={petkey} className="flex flex-col gap-3">
        <LabeledContent1 label={"Trait"}>
          <div className="flex flex-col gap-3">
            {pet.Traits.map((trait, traitkey) => (
              <PetDetail
                key={traitkey}
                button={<div className="">{trait.Trait}</div>}
              >
                <main className="text-sm">
                  <section>
                    <h3>{`Unlocks at level ${trait.Level}`}</h3>
                  </section>
                  <section>
                    <p>{trait.Description}</p>
                  </section>
                </main>
              </PetDetail>
            ))}
          </div>
        </LabeledContent1>
        <LabeledContent1 label={"Skills"}>
          <div className="flex flex-col gap-3">
            {pet.Skills.map((skill, skillkey) => (
              <PetDetail
                key={skillkey}
                button={<div className="">{skill.Skill}</div>}
              >
                <main className="text-sm">
                  <section>
                    <h3>{`Unlocks at level ${skill.Level}`}</h3>
                  </section>
                  <section>
                    <p>{skill.Description}</p>
                  </section>
                </main>
              </PetDetail>
            ))}
          </div>
        </LabeledContent1>
      </main>
    ))
  );
}

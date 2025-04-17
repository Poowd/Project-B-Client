import LabeledContent1 from "../LabeledContent1";
import PetDetail from "../single/modal/PetDetail";

export default function PetTraitDetails({ traits }) {
  return (
    <main className="flex flex-col gap-3">
      <LabeledContent1 label={"Trait"}>
        <div className="flex flex-col gap-3">
          {traits &&
            traits.map((trait, traitkey) => (
              <PetDetail
                key={traitkey}
                button={<div className="">{trait.Trait}</div>}
              >
                <main className="text-sm text-start">
                  <section>
                    <h3>{`Unlocks at level ${trait.Level}`}</h3>
                  </section>
                  <section>
                    <pre>{trait.Description}</pre>
                  </section>
                </main>
              </PetDetail>
            ))}
        </div>
      </LabeledContent1>
    </main>
  );
}

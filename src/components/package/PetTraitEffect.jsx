import LabeledContent1 from "../LabeledContent1";
import PetDetail from "../single/modal/PetDetail";

export default function PeteffectEffect({ title, effects }) {
  return (
    <main className="flex flex-col gap-3">
      <LabeledContent1 label={title}>
        <div className="flex flex-col gap-3">
          {effects &&
            effects.map((effect, effectkey) => (
              <PetDetail
                key={effectkey}
                button={<div className="">{effect[2]}</div>}
              >
                <main className="text-sm text-start">
                  <section>
                    <h3>{`Unlocks at level ${effect[3]}`}</h3>
                  </section>
                  <section>
                    <pre>{effect[4]}</pre>
                  </section>
                </main>
              </PetDetail>
            ))}
        </div>
      </LabeledContent1>
    </main>
  );
}

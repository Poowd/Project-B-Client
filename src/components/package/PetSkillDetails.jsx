import LabeledContent1 from "../LabeledContent1";
import PetDetail from "../single/modal/PetDetail";

export default function PetSkillDetails({ skills }) {
  return (
    <main className="flex flex-col gap-3">
      <LabeledContent1 label={"Skill"}>
        <div className="flex flex-col gap-3">
          {skills &&
            skills.map((skill, skillkey) => (
              <PetDetail
                key={skillkey}
                button={<div className="">{skill.Skill}</div>}
              >
                <main className="text-sm text-start">
                  <section>
                    <h3>{`Unlocks at level ${skill.Level}`}</h3>
                  </section>
                  <section>
                    <pre>{skill.Description}</pre>
                  </section>
                </main>
              </PetDetail>
            ))}
        </div>
      </LabeledContent1>
    </main>
  );
}

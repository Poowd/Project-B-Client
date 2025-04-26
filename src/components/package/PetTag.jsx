import LabeledContent1 from "../LabeledContent1";

export default function PetTag({ title, tags, highlight }) {
  return (
    <main className="flex flex-col gap-3">
      <LabeledContent1 label={title}>
        <div className={`flex flex-wrap justify-center gap-3`}>
          {tags &&
            tags.map((tag, tagkey) => (
              <div
                key={tagkey}
                className={`w-fit py-2 px-4 ${
                  highlight ? highlight : "bg-neutral-800"
                } rounded-full text-sm`}
              >
                {tag[2]}
              </div>
            ))}
        </div>
      </LabeledContent1>
    </main>
  );
}

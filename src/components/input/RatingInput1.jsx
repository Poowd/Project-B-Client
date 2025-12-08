"use client";

export default function RatingInput1({
  label,
  name,
  value,
  onChange,
  description,
  type,
}) {
  return (
    <fieldset className="h-full w-full flex flex-col justify-between">
      <label className="text-sm mb-2.5">
        <p>{label}</p>
        <p className="text-sm text-neutral-400">{description}</p>
      </label>
      <div className="h-10 w-full flex gap-5 items-center justify-center flex-wrap">
        <div className="text-sm text-neutral-400">Poor</div>
        {[1, 2, 3, 4, 5].map((rating) => (
          <label
            key={rating}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={rating}
              checked={value === rating}
              onChange={onChange}
              className="size-5"
              required
            />
            <span className="text-sm">{rating}</span>
          </label>
        ))}
        <div className="text-sm text-neutral-400">Excellent</div>
      </div>
    </fieldset>
  );
}

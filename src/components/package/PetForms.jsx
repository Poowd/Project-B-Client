export default function PetForms({ handleSubmit, title, isPending, children }) {
  return (
    <main>
      <section>
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-center gap-3 p-10 overflow-y-auto"
        >
          <header>
            <h1 className="text-2xl text-neutral-700">{title}</h1>
            <p className="text-neutral-500">Fill all necessary input.</p>
          </header>

          <section className="flex flex-col gap-2 mb-5">
            <main className="flex flex-col gap-3">{children}</main>
          </section>

          <section className="flex items-center justify-center gap-2 mb-5">
            <button
              type="submit"
              disabled={isPending}
              className="w-fit py-2 px-3 border border-neutral-300 rounded bg-neutral-100 text-neutral-700 hover:cursor-pointer hover:bg-neutral-400"
            >
              {isPending ? "Submitting" : "Submit"}
            </button>
          </section>
        </form>
      </section>
    </main>
  );
}

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
              className="border-0 py-2 px-5 text-sm rounded-full bg-red-400 hover:bg-red-500 shadow-sm text-white"
            >
              {isPending ? "Submitting" : "Submit"}
            </button>
          </section>
        </form>
      </section>
    </main>
  );
}

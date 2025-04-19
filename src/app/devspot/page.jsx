import { auth0 } from "@/lib/auth0";

export default async function Page() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main className="h-screen w-screen flex flex-col justify-center items-center gap-3">
        <section className="text-4xl">welcome to devspot</section>
        <section>
          <a href="/auth/login?returnTo=/devspot/pages">
            <button className="py-2 px-5 border border-neutral-300 rounded bg-red-400 text-white">
              Log in
            </button>
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center gap-3">
      <section>You are logged-in,</section>
      <section className="text-4xl">{session.user.name}</section>
      <section>
        <a href="/auth/login?returnTo=/devspot/pages"></a>
        <a href="/auth/logout">
          <button className="py-2 px-5 border border-neutral-300 rounded bg-red-400 text-white">
            Log Out
          </button>
        </a>
      </section>
    </main>
  );
}

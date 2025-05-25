import { auth0 } from "../../lib/auth0";

export default async function Page() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main className="h-screen w-screen flex flex-col justify-center items-center gap-3">
        <figure className="size-40">
          <img
            src={
              "https://www.pngplay.com/wp-content/uploads/9/Sheep-Transparent-File.png"
            }
            alt="sheep"
            className="size-full"
          ></img>
        </figure>
        <section className="text-4xl">Welcome to Devspot</section>
        <section className="mb-5">
          Login to the Admin Panel of Wiki Cyan Realms.
        </section>
        <section>
          <a href="/auth/login?returnTo=/devspot/pages">
            <button className="py-2 px-5 rounded bg-red-600 text-white">
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
          <button className="py-2 px-5 rounded bg-red-600 text-white">
            Log Out
          </button>
        </a>
      </section>
    </main>
  );
}

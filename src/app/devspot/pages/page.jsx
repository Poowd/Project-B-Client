import { auth0 } from "../../../lib/auth0";

export default async function Page() {
  const session = await auth0.getSession();
  return (
    <main>
      <h1>Welcome, {session.user.name}!</h1>
      <p>
        <a href="/auth/logout">
          <button>Log out</button>
        </a>
      </p>
    </main>
  );
}

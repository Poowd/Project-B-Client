"use client";

import { useEffect, useState, useTransition } from "react";
import BasicInput1 from "../../components/input/BasicInput1";

export default function Page() {
  const [isPending, startTransition] = useTransition();
  const [entry, setEntry] = useState({ user: "", passcode: "", email: "" });
  const [account, setAccount] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await fetch(`../api/e0/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(entry),
        });

        // Parse the response content
        const fetchData = await response.json();
        if (fetchData) {
          setAccount(fetchData);
          setEntry({ user: "", passcode: "" });
          try {
            if (typeof window !== "undefined" && window.localStorage) {
              localStorage.setItem(
                "WikitopiaAccount",
                JSON.stringify(fetchData)
              );
            }
          } catch (err) {
            console.error("Failed to set localStorage WikitopiaAccount", err);
          }
          window.location.assign("/e0");
        }
        return;
      } catch (error) {
        console.log(error);
      }
    });
    return;
  };

  return (
    <main className="h-[100vh] w-full flex items-center justify-center overflow-y-auto">
      <div className="w-xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl text-bold mb-2.5">Sign up</h1>
          <p className="text-neutral-600">
            Register a new account and wait for the confirmation.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex-1">
            <BasicInput1
              name={"User"}
              label={"User"}
              value={entry.user}
              onChange={(e) => {
                setEntry((prev) => ({
                  ...prev,
                  user: e.target.value,
                }));
              }}
            ></BasicInput1>
          </div>
          <div className="flex-1">
            <BasicInput1
              name={"Password"}
              label={"Password"}
              type={"password"}
              value={entry.passcode}
              onChange={(e) => {
                setEntry((prev) => ({
                  ...prev,
                  passcode: e.target.value,
                }));
              }}
            ></BasicInput1>
          </div>
          <div className="flex-1">
            <BasicInput1
              name={"Email"}
              label={"Email"}
              type={"email"}
              value={entry.email}
              onChange={(e) => {
                setEntry((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            ></BasicInput1>
          </div>
          <div>
            <button
              type="submit"
              className="mt-5 w-full py-3 px-5 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
              disabled={isPending}
            >
              {isPending ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

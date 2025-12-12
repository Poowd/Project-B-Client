"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { sidebarItems } from "./paths";
import BasicInput1 from "../../components/input/BasicInput1";

export default function Layout({ children }) {
  const [isPending, startTransition] = useTransition();
  const [entry, setEntry] = useState({ user: "", passcode: "" });
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initFromStorage = async () => {
      try {
        if (typeof window !== "undefined" && window.localStorage) {
          const stored = localStorage.getItem("WikitopiaAccount");
          if (stored) {
            const parsed = JSON.parse(stored);
            const creds = {
              user: parsed.data[0]?.Username ?? parsed.user ?? "",
              passcode: parsed.data[0]?.Password ?? parsed.passcode ?? "",
            };

            if (creds.user && creds.passcode) {
              // show creds in inputs briefly then attempt fetch
              setEntry(creds);

              try {
                const response = await fetch(`../../api/e0/fetchAccount`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(creds),
                });

                if (!response.ok) {
                  console.warn(
                    "Auto sign-in failed with status",
                    response.status
                  );
                  return;
                }

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
                    if (typeof window !== "undefined" && window.localStorage) {
                      localStorage.removeItem("WikitopiaAccount");
                    }
                    setEntry({ user: "", passcode: "" });
                    console.error(
                      "Failed to set localStorage WikitopiaAccount",
                      err
                    );
                  }
                }
              } catch (err) {
                if (typeof window !== "undefined" && window.localStorage) {
                  localStorage.removeItem("WikitopiaAccount");
                }
                setEntry({ user: "", passcode: "" });
                console.error(
                  "Failed to fetch account during auto sign-in",
                  err
                );
              }
            }
          }
        }
      } catch (err) {
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.removeItem("WikitopiaAccount");
        }
        setEntry({ user: "", passcode: "" });
        console.error("Failed to load WikitopiaAccount from localStorage", err);
      }
    };

    initFromStorage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await fetch(`../../api/e0/fetchAccount`, {
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
        }
        return;
      } catch (error) {
        console.log(error);
      }
    });
    return;
  };

  const handleSignout = () => {
    setAccount(null);
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.removeItem("WikitopiaAccount");
      }
    } catch (err) {
      console.error("Failed to remove WikitopiaAccount", err);
    }
    return;
  };

  console.log(account);

  if (account && account?.status) {
    return (
      <main className="w-full min-h-[100vh] bg-neutral-900 text-neutral-100 select-none relative">
        <section className="size-full scroll-smooth flex flex-col lg:flex-row relative">
          <div className="hidden lg:flex flex-none min-h-[100vh] w-[300px] bg-neutral-950/50 text-neutral-400 relative">
            <div className="sticky top-0 h-[100vh] w-full flex flex-col justify-between p-5">
              <div>
                <h1 className="border-neutral-800 border-b pb-2 mb-4">
                  Wikitopia
                </h1>
                <ul className="flex flex-col gap-1">
                  {sidebarItems.map((item, index) => (
                    <Link href={item.href} key={index}>
                      <li className="p-2.5 rounded hover:bg-neutral-950/50 hover:cursor-pointer flex gap-2.5 items-center">
                        <span>{item.name}</span>
                        <span className="text-xs">
                          {item.plugin && "[" + item.plugin + "]"}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="flex flex-col-reverse gap-1">
                  <li
                    className="p-2.5 rounded hover:bg-neutral-950/50 hover:cursor-pointer flex items-center gap-2"
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      handleSignout();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleSignout();
                      }
                    }}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:hidden flex flex-none min-h-[8vh] w-full bg-neutral-950/50 text-neutral-400 relative">
            <div className="sticky top-0 h-[8vh] w-full flex items-center justify-between p-5">
              <div>
                <h1 className="text-xl">Wikitopia</h1>
              </div>
              <div>
                <h1>Menu</h1>
              </div>
            </div>
          </div>
          <div className="flex-1">{children}</div>
        </section>
      </main>
    );
  }

  return (
    <main className="h-[100vh] w-full flex items-center justify-center overflow-y-auto">
      <div className="w-xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl text-bold mb-2.5">Sign in</h1>
          <p className="text-neutral-600">
            No account?{" "}
            <Link href={"/signup"} className="text-neutral-300 underline">
              Sign Up
            </Link>{" "}
            here.
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
          <div>
            <button
              type="submit"
              className="mt-5 w-full py-3 px-5 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
              disabled={isPending}
            >
              {isPending ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

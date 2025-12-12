"use client";

import { useEffect, useState } from "react";
import {
  buildNavigationItems,
  feedbackForms,
  petNavigationItems,
} from "../paths";
import Link from "next/link";
import { imageUrl } from "../../config";
import { getFormattedDate } from "../../../hooks/functions/getFormattedDate";

export default function Page() {
  // const [count, setCount] = useState(0);
  const [buildList, setBuildList] = useState(null);
  const [dashboardContent, setdashboardContent] = useState(petDashboard[0]);

  useEffect(() => {
    // Simulate fetching data from an API or database
    let index = 0;
    const intervalId = setInterval(() => {
      if (index < petDashboard.length) {
        setdashboardContent(petDashboard[index]);
        index++;
      } else {
        index = 0; // Reset to start when we reach the end
      }
      // setCount((prevCount) => prevCount + 1);
    }, 10000); // 1000ms (1 second) interval

    // The cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch(`../../../api/e0/browseBuilds`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const fetchData = await response.json();
      setBuildList(fetchData.data);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="size-full p-5 md:p-10 flex flex-col gap-10 scroll-smooth">
      <header className="w-full">
        <ul className="w-full grid grid-cols-3 md:grid-cols-5 gap-2.5 md:gap-5">
          {buildNavigationItems.map((item, index) =>
            item.status ? (
              <Link href={item.href} key={index}>
                <li className="size-full aspect-video rounded-lg p-2.5 md:p-5 text-xs md:text-sm lg:text-lg bg-neutral-950/50 text-neutral-400 hover:cursor-pointer flex justify-center items-center">
                  {item.name}
                </li>
              </Link>
            ) : (
              <li
                key={index}
                className="size-full aspect-video rounded-lg p-5 bg-neutral-950/25 text-neutral-800 hover:cursor-pointer flex justify-center items-center"
              ></li>
            )
          )}
        </ul>
      </header>
      <section className="w-full">
        <div className="aspect-5/2 w-full flex flex-col lg:flex-row bg-neutral-950/50 text-neutral-400 rounded-lg p-5 gap-5">
          <div className="flex-3/5">
            <figure className="h-full w-full bg-neutral-950/50 rounded-lg">
              {dashboardContent.imageUrl && (
                <img
                  src={dashboardContent.imageUrl}
                  alt={dashboardContent.title}
                  className="w-full h-full object-cover rounded-lg ease-in-out duration-300"
                />
              )}
            </figure>
          </div>
          <div className="flex-2/5 flex flex-col justify-between gap-5 md:p-5 lg:overflow-y-scroll no-scrollbar">
            {dashboardContent.id !== 0 && (
              <>
                <div className="flex flex-col gap-5">
                  <div>
                    <h1 className="text-2xl">{dashboardContent.title}</h1>
                    <h3 className="text-lg">{dashboardContent.subtitle}</h3>
                  </div>
                  <div>
                    <p>{dashboardContent.description}</p>
                  </div>
                </div>
                <div>
                  <p>Date Posted: {dashboardContent.datePosted}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="w-full mb-5 border-b border-neutral-800 flex gap-10 pb-2 text-center">
          <div className="flex-1">
            <p className={`mb-2.5`}>Showcase your</p>
            <h1 className={`text-4xl font-bold mb-2.5`}>Builds!</h1>
            <h3 className="text-xl"></h3>
          </div>
        </div>
        <div className="w-full">
          {!buildList ||
            (buildList.length === 0 && <div>No build competitions found.</div>)}
          {!buildList && <div>Loading...</div>}
          {buildList && (
            <div className="w-full flex flex-col gap-5">
              {buildList
                .sort((a, b) => new Date(a.StartDate) + new Date(b.StartDate))
                .map((item, i) => (
                  <Link
                    key={i}
                    href={{
                      pathname: `/v0/builds/${item.BUILDID}`,
                      query: { data: JSON.stringify(item) },
                    }}
                    className="w-full"
                  >
                    <div className="flex items-center gap-10 bg-neutral-900 text-start border-b border-neutral-800 p-5 hover:bg-neutral-950/50 ease-in-out duration-300">
                      <figure>
                        <img
                          src={imageUrl.concat(item.Image)}
                          className="h-52 lg:h-60 aspect-video object-cover rounded-2xl"
                        ></img>
                      </figure>
                      <div>
                        <div className="mb-2.5">
                          <h1 className="font-semibold">{item.Title}</h1>
                          <p>{item.Subtitle}</p>
                        </div>
                        <div className="text-xs text-neutral-600">
                          <p>{`Start Date: ${getFormattedDate(
                            item.StartDate
                          )}`}</p>
                          <p>{`End Date: ${getFormattedDate(item.EndDate)}`}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

const petDashboard = [
  {
    id: 1,
    title: "Cubiods Update 1.0",
    subtitle: "The Land of the Fairies",
    datePosted: "24th June 2024",
    imageUrl:
      "https://ukstories.microsoft.com/wp-content/uploads/2016/11/minecraft1-6-4-1920x1080-png2-1.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    title: "Cubiods Update 2.0",
    subtitle: "The Land of the Fairies",
    datePosted: "25th June 2025",
    imageUrl:
      "https://www.pluggedin.com/wp-content/uploads/2020/01/minecraft-review-image.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    title: "Cubiods Update 3.0",
    subtitle: "The Land of the Fairies",
    datePosted: "26th June 2026",
    imageUrl:
      "https://gaming-cdn.com/images/news/articles/8241/cover/1000x563/from-now-on-minecraft-will-get-several-free-updates-a-year-cover66df1e5ce5940.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

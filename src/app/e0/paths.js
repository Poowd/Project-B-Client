export const sidebarItems = [
  { name: "Home", plugin: null, href: "/e0/" },
  { name: "Cubiods", plugin: "pets", href: "/e0/pets" },
  { name: "Build Competitions", plugin: "builds", href: "/e0/builds" },
  { name: "Server Events", plugin: "events", href: "/e0/" },
];

export const petNavigationItems = [
  { name: "Browse All", href: "/e0/pets/", status: true },
  { name: "Cubiod Creator", href: "/e0/pets/creator", status: true },
  { name: "Feedback", href: "/e0/pets/feedback", status: true },
  { name: null, href: "#", status: false },
  { name: null, href: "#", status: false },
];

export const buildNavigationItems = [
  { name: "Browse All", href: "/e0/builds/", status: true },
  { name: "Build Creator", href: "/e0/builds/building", status: true },
  { name: "Results", href: "/e0/builds/results", status: true },
  { name: "Feedback", href: "/e0/builds/feedback", status: true },
  { name: null, href: "#", status: false },
];

export const feedbackForms = {
  pets: "/e0/pets/feedback",
  builds: "/e0/builds/feedback",
};

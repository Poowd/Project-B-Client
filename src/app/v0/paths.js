export const sidebarItems = [
  { name: "Home", plugin: null, href: "/v0/" },
  { name: "Cubiods", plugin: "pets", href: "/v0/pets" },
  { name: "Build Competitions", plugin: "builds", href: "/v0/builds" },
  { name: "Server Events", plugin: "events", href: "/v0/" },
];

export const petNavigationItems = [
  { name: "Browse All", href: "/v0/pets/browse", status: true },
  { name: "Cubiod Creator", href: "/v0/pets/creator", status: true },
  { name: "Feedback", href: "/v0/pets/feedback", status: true },
  { name: null, href: "#", status: false },
  { name: null, href: "#", status: false },
];

export const buildNavigationItems = [
  { name: "Browse All", href: "/v0/builds/browse", status: true },
  { name: "Build Creator", href: "/v0/builds/creator", status: true },
  { name: "Results", href: "/v0/builds/results", status: true },
  { name: "Feedback", href: "/v0/builds/feedback", status: true },
  { name: null, href: "#", status: false },
];

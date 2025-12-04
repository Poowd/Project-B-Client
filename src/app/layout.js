import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Wikitopia",
  description: "Wiki for Cyan Realms Developed by Powd_.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css?family=Poppins"
          rel="stylesheet"
        />
      </head>
      <body className="bg-neutral-950 text-neutral-50 scroll-smooth">
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
// import { ThemeProvider } from "next-themes";
import "./globals.css";
import Metrics from "../metrics";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import SessionProvider from "../components/SessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poppins",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  maximumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Notes-Aid",
  description: "A simple app to organize your academic notes",
  applicationName: "Notes-Aid",
  keywords: [
    "notes",
    "notes aid",
    "notes aid app",
    "notes aid website",
    "notes aid web app",
    "notes aid webapp",
    "notes aid notes",
    "notes aid academic notes",
    "academic notes",
    "academic notes app",
    "academic notes website",
    "academic notes web app",
    "academic notes webapp",
    "notes-aid",
    "notes-aid app",
    "notes-aid website",
    "notes-aid web app",
    "notes-aid webapp",
    "notes-aid notes",
    "notes-aid academic notes",
    "minavkaria",
    "vedanshsavla",
    "aarushsaboo",
    "minav"
  ],
  openGraph: {
    type: "website",
    title: "Notes-Aid",
    description: "A simple app to organize your academic notes",
    siteName: "Notes-Aid",
    url: "https://notes-aid.minavkaria.tech",
    images: [
      {
        url: "https://notes-aid.minavkaria.tech/icons/apple-touch-icon.png",
        width: 1200,
        height: 630,
        alt: "Icon",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/manifest.json",
      },
      {
        rel: "shortcut icon",
        url: "/favicon.ico",
      },
    ],
  },
  authors: [
    {
      url: "minavkaria.xyz",
      name: "Minav Karia",
    },
    {
      url: "vedanshsavla.xyz",
      name: "Vedansh Savla",
    },
    {
      url: "aarushsaboo.xyz",
      name: "Aarush Saboo",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SessionProvider>
          {/* <ThemeProvider attribute="class"> */}
            <Navbar />
            {children}
            <Metrics />
            <Footer />
          {/* </ThemeProvider> */}
        </SessionProvider>
      </body>
    </html>
  );
}

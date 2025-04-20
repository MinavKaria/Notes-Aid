"use client";

import { SessionProvider as Provider } from "next-auth/react";
// import { useEffect } from "react";

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useEffect(() => {
  //   if ("serviceWorker" in navigator) {
  //     navigator.serviceWorker.register("/service-worker.js").then((registration) => {
  //       console.log("Service Worker registered with scope:", registration.scope);
  //     });
  //   }

  //   Notification.requestPermission().then((permission) => {
  //     if (permission === "granted") {
  //       console.log("Notification permission granted.");
  //     }
  //   });

  //   console.log("SessionProvider mounted");
  // }, []);
  return <Provider>{children}</Provider>;
}

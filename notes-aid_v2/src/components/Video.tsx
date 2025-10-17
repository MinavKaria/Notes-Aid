"use client";
import React from "react";

type VideoProps = {
  id: string; // youtube id or full url
  title?: string;
  className?: string;
};

export default function Video({ id, title, className }: VideoProps) {
  const src =
    id.includes("youtube.com") || id.includes("youtu.be")
      ? id
      : `https://www.youtube.com/embed/${id}`;

  return (
    <div className={"w-full rounded overflow-hidden " + (className || "")}>
      <div className="relative pb-[56.25%] bg-black">
        <iframe
          className="absolute inset-0 w-full h-full border-0"
          src={src}
          title={title || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

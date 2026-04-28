import React from "react";
import Image from "next/image";
import { Photo } from "./Photo";

// Override standard markdown image syntax: ![alt](src "caption")
function MdxImage({
  src,
  alt,
  title,
}: {
  src?: string;
  alt?: string;
  title?: string;
}) {
  if (!src) return null;
  return (
    <figure style={{ margin: "2rem 0" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          maxHeight: "520px",
          aspectRatio: "4 / 3",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, 680px"
        />
      </div>
      {title && (
        <figcaption
          style={{
            marginTop: "0.5rem",
            fontSize: "0.8125rem",
            color: "#9ca3af",
            textAlign: "center",
            fontFamily: "'SF Mono', 'Fira Code', monospace",
          }}
        >
          {title}
        </figcaption>
      )}
    </figure>
  );
}

// Unwrap <p> when its only child is an image — avoids invalid <p><figure><div> nesting
function MdxParagraph({ children }: { children?: React.ReactNode }) {
  const arr = React.Children.toArray(children);
  if (
    arr.length === 1 &&
    React.isValidElement(arr[0]) &&
    "src" in (arr[0].props as Record<string, unknown>)
  ) {
    return <>{children}</>;
  }
  return <p>{children}</p>;
}

export const mdxComponents = {
  Photo,
  img: MdxImage,
  p: MdxParagraph,
};

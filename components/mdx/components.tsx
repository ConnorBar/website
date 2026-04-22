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
          aspectRatio: "16 / 9",
          borderRadius: "8px",
          overflow: "hidden",
          background: "#f3f4f6",
        }}
      >
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          style={{ objectFit: "cover" }}
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

export const mdxComponents = {
  // Custom components usable as <Photo src="..." alt="..." caption="..." />
  Photo,
  // Override standard markdown image syntax
  img: MdxImage,
};

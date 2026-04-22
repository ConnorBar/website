import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  caption?: string;
  /** "full" spans the full prose width (default), "wide" breaks out slightly wider */
  size?: "full" | "wide";
};

export function Photo({ src, alt, caption, size = "full" }: Props) {
  const isWide = size === "wide";
  return (
    <figure
      style={{
        margin: "2rem 0",
        ...(isWide
          ? { marginLeft: "-2rem", marginRight: "-2rem" }
          : {}),
      }}
    >
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
          alt={alt}
          fill
          style={{ objectFit: "cover" }}
          sizes={isWide ? "90vw" : "(max-width: 768px) 100vw, 680px"}
        />
      </div>
      {caption && (
        <figcaption
          style={{
            marginTop: "0.5rem",
            fontSize: "0.8125rem",
            color: "#9ca3af",
            textAlign: "center",
            fontFamily: "'SF Mono', 'Fira Code', monospace",
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

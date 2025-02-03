"use client";
export function ScrollLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <button
        onClick={() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {children}
      </button>
    </>
  );
}

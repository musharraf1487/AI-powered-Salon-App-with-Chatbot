import type { SVGProps } from "react";

export function GlamBotLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L13.9 7.4L19 8.6L15 12.3L15.8 17.8L12 15L8.2 17.8L9 12.3L5 8.6L10.1 7.4L12 2z" />
      <path d="M12 2L12 15" />
      <path d="M19 8.6L9 12.3" />
      <path d="M5 8.6L15 12.3" />
    </svg>
  );
}

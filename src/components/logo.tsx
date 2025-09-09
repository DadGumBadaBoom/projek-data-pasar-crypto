import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-8 h-8", className)}
    >
      <path
        d="M2 17C2 14.1667 2.00001 12.0625 3.5 10.5625C4.95833 9.02083 7.08333 9 10 9H14C16.9167 9 19.0417 9.02083 20.5 10.5625C22 12.0625 22 14.1667 22 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 13L15 7L13.5 13L11 14L9 13Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

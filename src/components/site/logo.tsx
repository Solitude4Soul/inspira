import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("font-headline text-2xl font-bold tracking-tight", className)}>
      <span className="text-gradient bg-gradient-to-r from-primary to-secondary">
        Inspira
      </span>
    </Link>
  );
}

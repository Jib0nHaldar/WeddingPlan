import Link from "next/link"
import { Heart } from "lucide-react"

import { cn } from "@/lib/utils"

export function SiteLogo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="WeddingPlan home"
      className={cn(
        "group flex items-center gap-2.5 rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className
      )}
    >
      <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-brand text-brand-foreground shadow-sm ring-1 ring-brand/20 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6 sm:size-11">
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/10"
        />
        <Heart
          className="relative size-4.5 fill-current sm:size-5"
          strokeWidth={1.75}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.35rem] font-semibold tracking-tight text-foreground sm:text-2xl">
          WeddingPlan
        </span>
        <span className="mt-1 text-[0.55rem] font-medium tracking-[0.2em] text-muted-foreground uppercase sm:text-[0.6rem]">
          Wedding Marketplace
        </span>
      </span>
    </Link>
  )
}

import type { ReactNode } from "react"
import { Heart } from "lucide-react"

type AuthCardProps = {
  title: string
  description: string
  children: ReactNode
  footer: ReactNode
}

export function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-[30rem] rounded-[1.75rem] border border-border/70 bg-card/95 p-6 shadow-xl shadow-black/5 backdrop-blur sm:p-8">
      <div className="flex flex-col items-center text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-sm ring-1 ring-brand/20">
          <Heart className="size-6 fill-current" strokeWidth={1.75} />
        </span>
        <h1 className="mt-5 font-serif text-3xl font-semibold tracking-tight text-balance sm:text-[2rem]">
          {title}
        </h1>
        <p className="mt-2 max-w-sm text-sm leading-6 text-pretty text-muted-foreground">
          {description}
        </p>
      </div>

      {children}

      <div className="mt-6">{footer}</div>
    </div>
  )
}

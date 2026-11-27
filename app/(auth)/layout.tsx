import Image from "next/image"
import { Heart, ShieldCheck } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-brand-soft/30 sm:min-h-[calc(100svh-4.5rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-soft/60 via-transparent to-transparent dark:from-brand-soft/20" />
        <div className="absolute -top-32 -left-24 size-[28rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 size-[24rem] rounded-full bg-brand/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-stretch lg:gap-10 lg:px-8 lg:py-10">
        <div className="flex items-center justify-center">{children}</div>

        <aside className="relative hidden overflow-hidden rounded-[2rem] border border-white/10 bg-[#1b0a10] shadow-2xl shadow-brand/10 lg:block">
          <Image
            src="/wedding-venue.jpg"
            alt="Outdoor wedding ceremony with a floral arch and aisle"
            fill
            sizes="(min-width: 1024px) 45vw, 0px"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#1b0a10] via-[#1b0a10]/55 to-[#1b0a10]/10"
          />

          <div className="relative flex h-full flex-col justify-between p-8 text-white xl:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur">
              <Heart className="size-3.5 fill-current text-[#e8c97a]" />
              WeddingPlan
            </span>

            <div className="max-w-sm">
              <p className="font-serif text-3xl leading-tight text-balance xl:text-4xl">
                Every detail, thoughtfully planned.
              </p>
              <p className="mt-4 text-sm leading-6 text-white/70">
                Join couples and trusted wedding professionals building
                unforgettable celebrations together.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs text-white/60">
                <ShieldCheck className="size-4 text-[#e8c97a]" />
                Verified vendors. Curated services.
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

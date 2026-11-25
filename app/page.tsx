import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

const stats = [
  { value: "6+", label: "Curated categories" },
  { value: "100%", label: "Vetted listings" },
  { value: "Direct", label: "Booking requests" },
] as const

export default function Page() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-[#1b0a10]">
        {/* Photo source: https://unsplash.com (free-to-use wedding photography) */}
        <Image
          src="/wedding-banner.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover object-[70%_center] opacity-30 blur-[1px] sm:object-center"
        />
        <div aria-hidden className="absolute inset-0 bg-[#1b0a10]/80" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-[#1b0a10] via-[#1b0a10]/70 to-[#2a1018]/50"
        />
        <div
          aria-hidden
          className="absolute -top-24 right-1/4 size-96 rounded-full bg-[#e8c97a]/10 blur-3xl"
        />

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 sm:gap-12 sm:px-8 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
          <div className="max-w-2xl animate-in duration-700 fade-in slide-in-from-bottom-4 motion-reduce:animate-none">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e8c97a]/30 bg-[#e8c97a]/10 px-3.5 py-1.5 text-xs font-medium text-[#f3e4c3] backdrop-blur">
              <Sparkles className="size-3.5 text-[#e8c97a]" />
              Trusted by couples & wedding professionals
            </span>

            <h1 className="mt-6 font-serif text-4xl leading-[1.05] font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
              Your perfect wedding starts with the{" "}
              <span className="text-[#e8c97a] italic">right people.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-pretty text-white/75 sm:text-lg">
              Discover trusted venues, photographers, florists, and wedding
              professionals — compare services, check availability, and book the
              details that make your day unforgettable.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 w-full rounded-full bg-[#e8c97a] px-6 text-base font-medium text-[#3a1520] shadow-lg shadow-black/20 hover:bg-[#f0d79a] focus-visible:ring-[#e8c97a]/60 sm:w-auto"
                nativeButton={false}
                render={<Link href="/services" />}
              >
                Explore Wedding Services
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-full border-white/25 bg-white/5 px-6 text-base text-white backdrop-blur hover:bg-white/10 hover:text-white sm:w-auto"
                nativeButton={false}
                render={<Link href="/sign-up?role=vendor" />}
              >
                Join as a Vendor
              </Button>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-2xl font-semibold text-white sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/60">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto mb-6 w-full max-w-md lg:mb-0 lg:max-w-none">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[2.5rem] bg-[#e8c97a]/10 blur-2xl"
            />

            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 shadow-2xl shadow-black/40 sm:aspect-[4/5] lg:aspect-[5/6]">
              <Image
                src="/wedding-venue.jpg"
                alt="Outdoor wedding ceremony setup with a floral gazebo and aisle"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#1b0a10]/55 via-transparent to-transparent"
              />
            </div>

            <div className="absolute -bottom-5 left-4 flex max-w-[calc(100%-2rem)] items-center gap-3 rounded-2xl bg-white p-3 pr-4 shadow-xl shadow-black/25 sm:left-6">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f7e9ec] text-[#7a1f35]">
                <ShieldCheck className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#2a1018]">
                  Verified Wedding Pros
                </p>
                <p className="text-xs leading-4 text-[#6b5560]">
                  Every listing reviewed before going live
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

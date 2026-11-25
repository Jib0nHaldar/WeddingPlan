"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Sparkles,
} from "lucide-react"

import { SiteLogo } from "@/components/site-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
] as const

const accountItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Profile Settings", href: "/profile/settings", icon: Settings },
] as const

function getDisplayName(name?: string | null, email?: string | null) {
  return name?.trim() || email?.split("@")[0] || "Your account"
}

function getInitials(name?: string | null, email?: string | null) {
  const source = name?.trim() || email?.split("@")[0] || "WP"

  return source
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")
}

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [isSigningOut, setIsSigningOut] = React.useState(false)

  const user = session?.user
  const displayName = getDisplayName(user?.name, user?.email)
  const initials = getInitials(user?.name, user?.email)

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/"
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  async function handleSignOut() {
    setIsSigningOut(true)

    try {
      await authClient.signOut()
      setMobileOpen(false)
      router.replace("/")
      router.refresh()
    } catch {
      // Keep the current session UI if the request fails.
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:h-18 sm:px-6 lg:px-8">
        <SiteLogo />

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center gap-1 md:flex"
        >
          {navItems.map((item) => {
            const active = isActive(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                  active
                    ? "bg-brand-soft text-brand-soft-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 md:ml-0">
          <ThemeToggle />

          {isPending ? (
            <div aria-hidden className="hidden items-center gap-2 sm:flex">
              <span className="h-8 w-16 animate-pulse rounded-full bg-muted" />
              <span className="h-9 w-20 animate-pulse rounded-full bg-muted" />
            </div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="h-10 gap-2 rounded-full pr-2 pl-1.5"
                  />
                }
              >
                <Avatar size="sm">
                  <AvatarImage
                    src={user.image ?? undefined}
                    alt={displayName}
                  />
                  <AvatarFallback className="bg-brand-soft text-[0.65rem] font-semibold text-brand-soft-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden max-w-32 truncate text-sm font-medium sm:inline">
                  {displayName}
                </span>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" sideOffset={10} className="w-64">
                <div className="flex items-center gap-3 px-2 py-2.5">
                  <Avatar>
                    <AvatarImage
                      src={user.image ?? undefined}
                      alt={displayName}
                    />
                    <AvatarFallback className="bg-brand-soft text-xs font-semibold text-brand-soft-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {displayName}
                    </p>
                    {user.email ? (
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <DropdownMenuSeparator />

                {accountItems.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    render={<Link href={item.href} />}
                    className="cursor-pointer py-2"
                  >
                    <item.icon />
                    {item.label}
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  variant="destructive"
                  disabled={isSigningOut}
                  onClick={handleSignOut}
                  className="cursor-pointer py-2"
                >
                  <LogOut />
                  {isSigningOut ? "Signing out..." : "Logout"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-1.5 sm:flex">
              <Button
                variant="ghost"
                className="rounded-full px-3.5"
                nativeButton={false}
                render={<Link href="/sign-in" />}
              >
                Sign In
              </Button>
              <Button
                className="h-9 rounded-full bg-brand px-4 text-brand-foreground shadow-sm hover:bg-brand/90"
                nativeButton={false}
                render={<Link href="/sign-up" />}
              >
                Sign Up
              </Button>
            </div>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="gap-0 p-0 data-[side=right]:w-[min(20rem,88vw)] data-[side=right]:sm:max-w-sm"
            >
              <SheetHeader className="border-b px-5 py-4">
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Browse the site and manage your account.
                </SheetDescription>
                <SiteLogo className="self-start" />
              </SheetHeader>

              <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-5">
                <nav aria-label="Mobile" className="grid gap-1">
                  {navItems.map((item) => {
                    const active = isActive(item.href)

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-brand-soft text-brand-soft-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {item.label}
                        {active ? (
                          <span className="size-1.5 rounded-full bg-brand" />
                        ) : null}
                      </Link>
                    )
                  })}
                </nav>

                <Separator />

                {isPending ? (
                  <div aria-hidden className="grid gap-2">
                    <span className="h-14 animate-pulse rounded-xl bg-muted" />
                    <span className="h-10 animate-pulse rounded-xl bg-muted" />
                  </div>
                ) : user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 rounded-2xl bg-muted/60 p-3">
                      <Avatar size="lg">
                        <AvatarImage
                          src={user.image ?? undefined}
                          alt={displayName}
                        />
                        <AvatarFallback className="bg-brand-soft text-xs font-semibold text-brand-soft-foreground">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {displayName}
                        </p>
                        {user.email ? (
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <nav aria-label="Account" className="grid gap-1">
                      {accountItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        >
                          <item.icon className="size-4" />
                          {item.label}
                        </Link>
                      ))}
                      <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:pointer-events-none disabled:opacity-50"
                      >
                        <LogOut className="size-4" />
                        {isSigningOut ? "Signing out..." : "Logout"}
                      </button>
                    </nav>
                  </div>
                ) : (
                  <div className="grid gap-2">
                    <Button
                      variant="outline"
                      className="h-10 w-full rounded-full"
                      nativeButton={false}
                      render={<Link href="/sign-in" />}
                      onClick={() => setMobileOpen(false)}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="h-10 w-full rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
                      nativeButton={false}
                      render={<Link href="/sign-up" />}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Sparkles className="size-4" />
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

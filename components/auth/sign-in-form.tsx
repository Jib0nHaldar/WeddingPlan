"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react"

import { AuthCard } from "@/components/auth/auth-card"
import { GoogleButton } from "@/components/auth/google-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignInForm() {
  const [showPassword, setShowPassword] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const payload = {
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
    }

    // TODO: Send this payload to Better Auth once authentication is connected.
    // Passwords are collected but never logged in plain text.
    console.log("Sign-in form data:", {
      ...payload,
      password: payload.password ? "[redacted]" : "",
    })
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to manage your wedding plans, saved vendors, and bookings."
      footer={
        <p className="text-center text-sm text-muted-foreground">
          New to WeddingPlan?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-brand underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="h-11 rounded-xl bg-background pl-10"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              className="h-11 rounded-xl bg-background pr-11 pl-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="mt-1 h-11 w-full rounded-full bg-brand text-sm font-semibold text-brand-foreground shadow-sm hover:bg-brand/90"
        >
          Sign In
          <ArrowRight className="size-4" />
        </Button>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[0.7rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            Or continue with
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <GoogleButton label="Sign in with Google" />
      </form>
    </AuthCard>
  )
}

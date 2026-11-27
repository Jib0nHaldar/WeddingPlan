"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  Camera,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react"

import { AuthCard } from "@/components/auth/auth-card"
import { GoogleButton } from "@/components/auth/google-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export type AccountRole = "customer" | "vendor"

const roles = [
  {
    value: "customer",
    label: "Customer",
    description: "Plan & book services",
  },
  {
    value: "vendor",
    label: "Vendor",
    description: "Publish wedding services",
  },
] as const satisfies ReadonlyArray<{
  value: AccountRole
  label: string
  description: string
}>

type SignUpFormProps = {
  defaultRole?: AccountRole
}

export function SignUpForm({ defaultRole = "customer" }: SignUpFormProps) {
  const [role, setRole] = React.useState<AccountRole>(defaultRole)
  const [showPassword, setShowPassword] = React.useState(false)
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null)

  React.useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview)
      }
    }
  }, [photoPreview])

  function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      setPhotoPreview(null)
      return
    }

    setPhotoPreview(URL.createObjectURL(file))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const photo = formData.get("profilePhoto")

    const payload = {
      role: String(formData.get("role") ?? role),
      fullName: String(formData.get("fullName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
      profilePhoto: photo instanceof File && photo.size > 0 ? photo : null,
    }

    // TODO: Send this payload to Better Auth once authentication is connected.
    // Passwords are collected but never logged in plain text.
    console.log("Sign-up form data:", {
      ...payload,
      password: payload.password ? "[redacted]" : "",
    })
  }

  return (
    <AuthCard
      title="Create your WeddingPlan account"
      description="Join as a couple planning your wedding or a vendor offering curated services."
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-brand underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
        <fieldset>
          <legend className="mb-2.5 text-sm font-medium text-foreground">
            Account Role
          </legend>
          <div className="grid grid-cols-2 gap-3">
            {roles.map((item) => (
              <label key={item.value} className="relative block cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={item.value}
                  checked={role === item.value}
                  onChange={() => setRole(item.value)}
                  className="peer sr-only"
                />
                <span className="flex h-full flex-col gap-1 rounded-xl border border-input bg-background p-3.5 pr-8 transition-colors peer-checked:border-brand peer-checked:bg-brand-soft/60 peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">
                  <span className="text-sm font-semibold text-foreground">
                    {item.label}
                  </span>
                  <span className="text-xs leading-4 text-muted-foreground">
                    {item.description}
                  </span>
                </span>
                <span className="pointer-events-none absolute top-3.5 right-3.5 flex size-4 items-center justify-center rounded-full border border-input bg-background text-transparent peer-checked:border-brand peer-checked:bg-brand peer-checked:text-brand-foreground">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex items-center gap-4 rounded-xl border border-input bg-muted/30 p-3.5 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50">
          <Avatar className="size-12 border border-border/70">
            {photoPreview ? (
              <AvatarImage src={photoPreview} alt="Selected profile photo" />
            ) : null}
            <AvatarFallback className="bg-brand-soft text-sm font-semibold text-brand-soft-foreground">
              WP
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <Label
              htmlFor="profilePhoto"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1.5 text-[0.7rem] font-medium transition-colors hover:bg-muted"
            >
              <Camera className="size-3.5" />
              Upload Profile Photo (Optional)
            </Label>
            <Input
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handlePhotoChange}
              className="sr-only"
            />
            <p className="mt-1.5 text-xs leading-4 text-muted-foreground">
              Hosted on ImgBB (PNG, JPG, WebP, max 5MB).
            </p>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Emma Watson"
              required
              className="h-11 rounded-xl bg-background pl-10"
            />
          </div>
        </div>

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
              autoComplete="new-password"
              placeholder="Min 6 chars, 1 uppercase & 1 lowercase"
              required
              minLength={6}
              pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
              aria-describedby="password-hint"
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
          <p
            id="password-hint"
            className="text-xs leading-4 text-muted-foreground"
          >
            Must be at least 6 characters with 1 uppercase and 1 lowercase
            letter.
          </p>
        </div>

        <Button
          type="submit"
          className="mt-1 h-11 w-full rounded-full bg-brand text-sm font-semibold text-brand-foreground shadow-sm hover:bg-brand/90"
        >
          Create Account
          <ArrowRight className="size-4" />
        </Button>

        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[0.7rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            Or continue with
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <GoogleButton label="Sign up with Google" />
      </form>
    </AuthCard>
  )
}

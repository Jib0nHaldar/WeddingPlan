import type { Metadata } from "next"

import { SignUpForm } from "@/components/auth/sign-up-form"
import { authClient } from "@/lib/auth-client"

export const metadata: Metadata = {
  title: "Create your account | WeddingPlan",
  description:
    "Join WeddingPlan as a couple planning your wedding or a vendor offering curated services.",
}

type SignUpPageProps = {
  searchParams: Promise<{ role?: string | string[] }>
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams
  const roleParam = Array.isArray(params.role) ? params.role[0] : params.role
  const defaultRole = roleParam === "vendor" ? "vendor" : "customer"

  const handleSignUp = async (formData: FormData) => {
    const { data, error } = await authClient.signUp.email({
      name: "John Doe", // required, The name of the user.
      email: "john.doe@example.com", // required, The email address of the user.
      password: "password1234", // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      image: "https://example.com/image.png", // An optional profile image of the user.
      callbackURL: "https://example.com/callback", // An optional URL to redirect to after the user signs up.
    });
  }

  return <SignUpForm key={defaultRole} defaultRole={defaultRole} />
}

import type { Metadata } from "next"

import { SignInForm } from "@/components/auth/sign-in-form"

export const metadata: Metadata = {
  title: "Sign in | WeddingPlan",
  description: "Sign in to your WeddingPlan account.",
}

export default function SignInPage() {
  return <SignInForm />
}

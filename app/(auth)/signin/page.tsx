import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { Quote } from "@/components/Quote";

export const metadata: Metadata = { title: "Sign in" };

export default function SigninPage() {
  return (
    <>
      <AuthForm type="Sign in" />
      <div className="hidden lg:block">
        <Quote />
      </div>
    </>
  );
}

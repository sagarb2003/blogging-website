import type { Metadata } from "next";
import { AuthForm } from "@/components/AuthForm";
import { Quote } from "@/components/Quote";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <>
      <AuthForm type="Sign up" />
      <div className="hidden lg:block">
        <Quote />
      </div>
    </>
  );
}

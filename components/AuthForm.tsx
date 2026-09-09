"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { UserPlus, LogIn, Loader2 } from "lucide-react";
import { signIn, signUp } from "@/actions/auth";

function SubmitButton({ type }: { type: "Sign up" | "Sign in" }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-black text-white w-72 text-lg font-bold p-2 rounded-xl disabled:opacity-60"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" size={20} />
          {type === "Sign up" ? "Signing up..." : "Signing in..."}
        </div>
      ) : (
        type
      )}
    </button>
  );
}

export const AuthForm = ({ type }: { type: "Sign up" | "Sign in" }) => {
  const action = type === "Sign up" ? signUp : signIn;
  const [state, formAction] = useActionState(action, null);

  return (
    <div className="h-screen flex justify-center flex-col text-center">
      <div className="text-4xl font-bold flex items-center justify-center gap-2">
        {type === "Sign up" ? (
          <>
            <UserPlus size={32} /> Create an account
          </>
        ) : (
          <>
            <LogIn size={32} /> Login
          </>
        )}
      </div>
      <div className="flex justify-center text-lg text-slate-500 mt-4">
        <div className="pr-2">{type === "Sign up" ? "Already have an account?" : "Don't have an Account?"}</div>
        <Link href={type === "Sign up" ? "/signin" : "/signup"} className="underline">
          {type === "Sign up" ? "Login" : "Sign in"}
        </Link>
      </div>
      <form action={formAction} className="flex flex-col items-center">
        {type === "Sign up" && (
          <LabelledInput label="Name" name="name" placeholder="John" />
        )}
        <LabelledInput label="E-mail" name="email" placeholder="abc@gmail.com" type="email" />
        <LabelledInput label="Password" name="password" placeholder="* * * * *" type="password" />
        {state?.error && <p className="text-red-600 text-sm mt-2 max-w-72">{state.error}</p>}
        <div className="mt-4">
          <SubmitButton type={type} />
        </div>
      </form>
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}

function LabelledInput({ label, name, placeholder, type }: LabelledInputProps) {
  return (
    <div className="m-2">
      <label htmlFor={name} className="block mb-2 text-md font-bold text-gray-900">
        {label}
      </label>
      <div className="flex justify-center mt-3">
        <input
          id={name}
          name={name}
          type={type || "text"}
          className="w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}

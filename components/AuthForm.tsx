"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowRight, AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { signIn, signUp } from "@/actions/auth";
import { Logo } from "@/components/landing/Logo";

type AuthType = "Sign up" | "Sign in";

const COPY = {
  "Sign up": {
    title: "Create your account",
    subtitle: "Start writing in less than a minute. Free, forever.",
    submit: "Create account",
    pending: "Creating account…",
    switchText: "Already have an account?",
    switchLabel: "Sign in",
    switchHref: "/signin",
  },
  "Sign in": {
    title: "Welcome back",
    subtitle: "Sign in to keep reading and writing on BlogVista.",
    submit: "Sign in",
    pending: "Signing in…",
    switchText: "New to BlogVista?",
    switchLabel: "Create an account",
    switchHref: "/signup",
  },
} as const;

function SubmitButton({ type }: { type: AuthType }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-ink text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_10px_30px_-12px_rgba(12,12,14,0.6)] transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {COPY[type].pending}
        </>
      ) : (
        <>
          {COPY[type].submit}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  );
}

export const AuthForm = ({ type }: { type: AuthType }) => {
  const action = type === "Sign up" ? signUp : signIn;
  const [state, formAction] = useActionState(action, null);
  const copy = COPY[type];

  return (
    <div className="flex min-h-screen flex-col px-6 py-8 sm:px-12">
      <Logo />

      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
        <h1 className="animate-fade-up text-3xl font-semibold tracking-[-0.03em] text-ink sm:text-4xl">
          {copy.title}
        </h1>
        <p className="mt-3 animate-fade-up text-[15px] text-zinc-500 [animation-delay:60ms]">{copy.subtitle}</p>

        <form action={formAction} className="mt-10 animate-fade-up space-y-5 [animation-delay:120ms]">
          {type === "Sign up" && (
            <Field label="Name" name="name" placeholder="Ada Lovelace" autoComplete="name" />
          )}
          <Field label="Email" name="email" type="email" placeholder="you@example.com" autoComplete="email" />
          <PasswordField
            hint={type === "Sign up" ? "At least 6 characters" : undefined}
            autoComplete={type === "Sign up" ? "new-password" : "current-password"}
          />

          {state?.error && (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {state.error}
            </p>
          )}

          <SubmitButton type={type} />
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          {copy.switchText}{" "}
          <Link href={copy.switchHref} className="font-medium text-ink underline-offset-4 hover:underline">
            {copy.switchLabel}
          </Link>
        </p>
      </div>

      <p className="text-center text-xs text-zinc-400 lg:text-left">
        © {new Date().getFullYear()} BlogVista ·{" "}
        <Link href="/" className="hover:text-zinc-600">
          Back to home
        </Link>
      </p>
    </div>
  );
};

const INPUT_CLASS =
  "block h-11 w-full rounded-xl border border-black/[0.08] bg-white px-3.5 text-[15px] text-ink shadow-[0_1px_2px_rgba(0,0,0,0.04)] outline-none transition-[border-color,box-shadow] placeholder:text-zinc-400 focus:border-ember-500/60 focus:ring-4 focus:ring-ember-500/10";

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-zinc-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className={INPUT_CLASS}
      />
    </div>
  );
}

function PasswordField({ hint, autoComplete }: { hint?: string; autoComplete: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
          Password
        </label>
        {hint && <span className="text-xs text-zinc-400">{hint}</span>}
      </div>
      <div className="relative">
        <input
          id="password"
          name="password"
          type={visible ? "text" : "password"}
          placeholder="••••••••"
          autoComplete={autoComplete}
          required
          className={`${INPUT_CLASS} pr-11`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 grid w-11 place-items-center text-zinc-400 transition-colors hover:text-zinc-700"
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

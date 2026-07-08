"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signupAction } from "../actions";

const initialState = { error: null };

export default function AdminSignupPage() {
  const [state, formAction, pending] = useActionState(signupAction, initialState);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4 py-16">
      <h1 className="text-2xl font-bold text-[#1a1a1a]">Create admin account</h1>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-medium text-[#1a1a1a]">
            Username
          </label>
          <input
            id="username"
            name="username"
            required
            minLength={3}
            autoComplete="username"
            className="rounded border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-[#1a1a1a]">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="rounded border border-zinc-300 px-3 py-2 text-sm"
          />
          <span className="text-xs text-[#3d3d3d]">At least 8 characters.</span>
        </div>

        {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="rounded bg-[#1a4480] px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
        >
          {pending ? "Creating account..." : "Sign up"}
        </button>
      </form>

      <p className="mt-4 text-sm text-[#3d3d3d]">
        Already have an account?{" "}
        <Link href="/admin/login" className="text-[#0076a3] underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

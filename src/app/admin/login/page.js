"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

const initialState = { error: null };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-[80vh] w-full items-center justify-center bg-zinc-50 px-4 py-16">
      <div className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">Admin login</h1>

        <form action={formAction} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm font-medium text-[#1a1a1a]">
              Username
            </label>
            <input
              id="username"
              name="username"
              required
              autoComplete="username"
              className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-[#1a1a1a]"
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
              autoComplete="current-password"
              className="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-[#1a1a1a]"
            />
          </div>

          {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

          <button
            type="submit"
            disabled={pending}
            className="rounded bg-[#1a4480] px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

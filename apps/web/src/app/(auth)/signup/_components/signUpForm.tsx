"use client";

import { SubmitButton } from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      {!!state?.message && (
        <p className="text-ember text-sm">{state.message}</p>
      )}

      <div className="flex flex-col gap-1">
        <Label className="text-parchment text-sm" htmlFor="name">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          autoComplete="name"
          defaultValue={state?.data?.name}
          className="bg-hearth border border-smoke text-parchment placeholder-ghost focus:outline-none focus:ring-2 focus:ring-ale/50 focus:border-ale transition"
        />
        {!!state?.errors?.name && (
          <p className="text-ember text-sm">{state.errors.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-parchment text-sm" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          autoComplete="email"
          placeholder="john@example.com"
          defaultValue={state?.data?.email}
          className="bg-hearth border border-smoke text-parchment placeholder-ghost focus:outline-none focus:ring-2 focus:ring-ale/50 focus:border-ale transition"
        />
        {!!state?.errors?.email && (
          <p className="text-ember text-sm">{state.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-parchment text-sm" htmlFor="password">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          defaultValue={state?.data?.password}
          className="bg-hearth border border-smoke text-parchment placeholder-ghost focus:outline-none focus:ring-2 focus:ring-ale/50 focus:border-ale transition"
        />
        {!!state?.errors?.password && (
          <div className="text-sm text-ember">
            <p>Password Must:</p>
            <ul>
              {Array.isArray(state.errors.password) ? (
                state.errors.password.map((error: string) => (
                  <li key={error}>{error}</li>
                ))
              ) : (
                <li>{state.errors.password}</li>
              )}
            </ul>
          </div>
        )}
      </div>

      <SubmitButton className="relative hover:cursor-pointer overflow-hidden bg-hearth px-3 text-parchment shadow-2xl transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-parchment before:transition-all before:duration-500 hover:text-hearth hover:before:left-0 hover:before:w-full hover:opacity-80">
        <span className="relative z-10">Sign Up</span>
      </SubmitButton>
    </form>
  );
};

export default SignUpForm;

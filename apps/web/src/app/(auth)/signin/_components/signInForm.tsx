"use client";

import { SubmitButton } from "@/components/submitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignInForm = () => {
  const [state, action] = useActionState(signIn, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      {!!state?.message && (
        <p className="text-ember text-sm">{state.message}</p>
      )}

      <div className="flex flex-col gap-1">
        <Label htmlFor="email" className="text-parchment text-sm">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          autoComplete="email"
          defaultValue={state?.data.email}
          className="bg-hearth border border-smoke text-parchment placeholder-ghost focus:outline-none focus:ring-2 focus:ring-ale/50 focus:border-ale transition"
        />
        {!!state?.errors?.email && (
          <p className="text-ember text-sm">{state.errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label htmlFor="password" className="text-parchment text-sm">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          defaultValue={state?.data.password}
          className="bg-hearth border border-smoke text-parchment placeholder-ghost focus:outline-none focus:ring-2 focus:ring-ale/50 focus:border-ale transition"
        />
        {!!state?.errors?.password && (
          <p className="text-ember text-sm">{state.errors.password}</p>
        )}
      </div>

      <SubmitButton className="relative hover:cursor-pointer overflow-hidden bg-hearth px-3 text-parchment shadow-2xl transition-all duration-300 before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-parchment before:transition-all before:duration-500 hover:text-hearth hover:before:left-0 hover:before:w-full hover:opacity-80">
        <span className="relative z-10">Sign In</span>
      </SubmitButton>
    </form>
  );
};

export default SignInForm;

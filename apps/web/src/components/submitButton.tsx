"use client";

import { useActionState } from "react";
import { Button, ButtonProps } from "./ui/button";

export const SubmitButton = ({ children, ...props }: ButtonProps) => {
  const [, , pending] = useActionState(() => {}, undefined);

  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? (
        <span className="animate-pulse hover:cursor-pointer">Submitting</span>
      ) : (
        children
      )}
    </Button>
  );
};

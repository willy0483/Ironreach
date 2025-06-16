"use client";
import Link from "next/link";
import SignInForm from "./_components/signInForm";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/lib/constants";

const SignInPage = () => {
  const [animateOut, setAnimateOut] = useState(false);

  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnimateOut(true);
    setTimeout(() => {
      redirect("/signup");
    }, 600);
  };

  return (
    <AnimatePresence>
      {!animateOut && (
        <motion.div
          className="min-h-screen w-full bg-hearth text-parchment p-10 flex overflow-hidden"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 flex-1 mx-auto rounded-4xl ">
            {/* Left Column */}
            <div className="p-10 relative bg-cask flex flex-col justify-center items-center rounded-4xl md:rounded-l-4xl md:rounded-r-none">
              <button
                onClick={handleSignUpClick}
                className="hover:cursor-pointer absolute right-0 top-0 px-4 py-2 bg-moonlight rounded-bl-xl rounded-tr-4xl md:rounded-tr-none"
              >
                SignUp
              </button>
              <div className="w-full max-w-md">
                <div className="flex flex-col justify-center items-center mb-6">
                  <Image
                    src={"/logo-dragon.png"}
                    alt="Tavern logo"
                    width={128}
                    height={128}
                    priority
                    className="absolute top-15"
                  />
                  <h1 className="text-center text-3xl font-bold text-ale tracking-tight">
                    Welcome back to the Tavern
                  </h1>
                </div>

                <SignInForm />
                <div className="flex justify-center my-5">
                  <Button>
                    <a href={`${BACKEND_URL}/auth/google/login`}>
                      Sign In With Google
                    </a>
                  </Button>
                </div>
                <Link
                  href="/auth/forgot"
                  className="mt-4 block text-center text-sm text-moonlight hover:text-moonlight/80 transition-colors"
                >
                  Forgot Your Password?
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative hidden md:block rounded-r-4xl overflow-hidden">
              <Image
                src="/auth/signin.jpg"
                alt="Tavern Illustration"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-hearth/80 to-transparent" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignInPage;

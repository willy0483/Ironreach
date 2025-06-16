"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { redirect } from "next/navigation";
import SignUpForm from "./_components/signUpForm";

const SignUpPage = () => {
  const [animateOut, setAnimateOut] = useState(false);

  const handleSignUpClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setAnimateOut(true);
    setTimeout(() => {
      redirect("/signin");
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
            {/* Right Column */}
            <div className="order-last p-10 relative bg-cask flex flex-col justify-center items-center rounded-4xl md:rounded-r-4xl md:rounded-l-none">
              <div className="absolute right-0 top-0 flex items-center gap-4">
                <p>Already have an account?</p>
                <button
                  onClick={handleSignUpClick}
                  className="hover:cursor-pointer px-4 py-2 bg-moonlight rounded-bl-xl rounded-tr-4xl"
                >
                  SignIn
                </button>
              </div>
              <div className="w-full max-w-md">
                <div className="flex flex-col justify-center items-center gap-4 mb-6">
                  <Image
                    src={"/logo-sword-armor.png"}
                    alt="Tavern logo"
                    width={128}
                    height={128}
                    priority
                  />
                  <h1 className="text-center text-3xl font-bold text-ale tracking-tight">
                    Create your Tavern account
                  </h1>
                </div>

                <SignUpForm />
              </div>
            </div>

            {/* Left Column */}
            <div className="order-first relative hidden md:block rounded-l-4xl overflow-hidden">
              <Image
                src="/auth/signup.jpg"
                alt="Tavern Illustration"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-fill object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-l from-hearth/80 to-transparent" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUpPage;

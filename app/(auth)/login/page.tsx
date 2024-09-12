"use client";
import Image from "next/image";
import { useSignIn, useAuth, useClerk } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Input from "@/components/shared/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();

  const router = useRouter();

  if (isSignedIn) {
    router.push("/");
  }

  const handleSignIn = async () => {
    if (!isLoaded) {
      alert("SignIn not loaded yet");
      return;
    }

    try {
      const signInResult = await signIn.create({
        identifier: email,
      });

      if (signInResult.status === "needs_first_factor") {
        await signIn.attemptFirstFactor({
          strategy: "password",
          password: password,
        });
      }

      router.push("/");

    } catch (error: any) {

      console.log("Error during login", error);


      if (error.errors) {
        error.errors.forEach((err: any) =>
          alert(`Login failed: ${err.message}`)
        );

        
      } else {
        alert("Login failed. Please check your credentials and try again.");
      }
    }
  };

  return (
    <div className="relative z-10">
      <Image
        src="/images/Netflix-Logo.svg"
        width={130}
        height={130}
        alt="logo"
      ></Image>
      <div className="flex justify-center">
        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <h1 className="text-white text-4xl mb-8 font-semibold">Sign In</h1>

          <Input
            label="Email"
            onChange={(e: any) => setEmail(e.target.value)}
            id="email"
            type="email"
            value={email}
          />
          <Input
            label="Password"
            onChange={(e: any) => setPassword(e.target.value)}
            id="password"
            type="password"
            value={password}
          />
          <button
            className="bg-red-600 py-3 text-white rounded-md w-full hover:bg-red-700 transition"
            onClick={handleSignIn}
          >
            Log In
          </button>
          <p className="text-neutral-500 mt-10">
            First time using Netflix?
            <span className="text-white ml-1 hover:underline cursor-pointer">
              <Link href="/sign-up">Create an account</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

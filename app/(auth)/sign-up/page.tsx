"use client";

import Image from "next/image";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import Input from "@/components/shared/input";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const { signUp, isLoaded } = useSignUp();

  const router = useRouter();

  const handleSignUp = async () => {
    if (!isLoaded) {
      alert("SignIn not loaded yet");
      return;
    }
    try {
      const signUpResult = await signUp.create({
        username: username,
        emailAddress: email,
        password: password,
      });

      await signUp.prepareEmailAddressVerification();
      setIsVerificationSent(true);
    } catch (error) {
      // console.log(error");
      alert(error);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      if (!signUp) {
        throw new Error("SignUp is not defined");
      }

      await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      router.push("/login");
    } catch (err) {
      alert(err);
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
          <h1 className="text-white text-4xl mb-8 font-semibold">
            {isVerificationSent ? "Verify Email" : "SignUp"}
          </h1>
          {isVerificationSent ? (
            <>
              <Input
                label="Verification Code"
                onChange={(e: any) => setVerificationCode(e.target.value)}
                id="verification-code"
                type="text"
                value={verificationCode}
              />
              <button
                className="bg-red-600 py-3 text-white rounded-md w-full hover:bg-red-700 transition"
                onClick={handleVerifyEmail}
              >
                Verify Email
              </button>
            </>
          ) : (
            <>
              <Input
                label="Username"
                onChange={(e: any) => setUsername(e.target.value)}
                id="username"
                type="text"
                value={username}
              />
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
                onClick={handleSignUp}
              >
                Sign Up
              </button>
              <p className="text-neutral-500 mt-10">
                First time using Netflix?
                <span className="text-white ml-1 hover:underline cursor-pointer">
                  <Link href="/sign-up">Create an account</Link>
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;

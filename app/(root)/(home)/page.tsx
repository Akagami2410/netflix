"use client";
import Image from "next/image";
import Link from "next/link";
import { useUser, useAuth } from "@clerk/nextjs";

const Home = () => {
  const { user } = useUser();

  return (
    <main>
      <div className="w-max flex flex-col mx-auto mt-[8rem] gap-8">
        <h1 className="text-3xl md:text-5xl">Who's watching?</h1>

        <div className="flex justify-between">
          <Link href="/browse" className="flex flex-col items-center group">
            <Image
              src="/images/Netflix-avatar.png"
              width={136}
              height={136}
              alt="avatar"
              className="border-3 border-transparent rounded-md group-hover:border-3 group-hover:border-white"
            ></Image>
            <span className="text-fade group-hover:text-white">
              {user?.username}
            </span>
          </Link>
          <button className="flex flex-col items-center justify-between group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="136"
              height="136"
              viewBox="0 0 100 100"
              className="border-2 border-transparent rounded-lg group-hover:bg-white transition-all"
            >
              <circle cx="50" cy="50" r="40" fill="rgb(82, 82, 82)" />
              <path
                d="M50 30 L50 70 M30 50 L70 50"
                className="transition-all group-hover:stroke-white"
                stroke="black"
                strokeWidth="10"
                strokeLinecap="butt"
              />
            </svg>

            <span className="group-hover:text-white text-fade">Add</span>
          </button>
        </div>

        {/* <Link
          href="/login"
          className="mt-8 px-28 py-4 tracking-widest  border-solid border-2 border-fade text-center text-fade hover:text-white hover:border-white"
        >
          Login
        </Link> */}
      </div>
    </main>
  );
};
export default Home;

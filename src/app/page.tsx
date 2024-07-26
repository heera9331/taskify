/**
 * @author Heera Singh Lodhi
 * @date 14-07-2024
 * @param props
 * @returns jsx
 * @description marketing page
 */

import { Navbar } from "./_components/navbar";
import Footer from "./_components/footer";

import Link from "next/link";
import { Medal } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <div
        className="flex items-center justify-center flex-col"
        id="marketing-page"
      >
        <div className="flex items-center justify-center flex-col min-h-full">
          <div className="mb-4 flex items-center  border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
            <Medal className="h-6 w-6 mr-2 " />
            <strong className="font-semibold">No 1 task management</strong>
          </div>
          <h1 className="text-3xl md:text-6xl text-center text-nuetral-800 mb-6">
            Taskify helps team move
          </h1>
          <div className="font-semibold shadow-md text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-2 rounded-md pb-4 w-fit">
            Work Forward
          </div>
          <div
            className={`text-sm md:text-xl text-nuetral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto  `}
          >
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is unique -
            accomplish it all with Taskify
          </div>
          <button className="mt-6 bg-black text-white px-3 py-2 rounded-md">
            <Link href={`/sign-up`}>Get Taskify for free</Link>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

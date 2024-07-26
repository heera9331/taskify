/**
 * @author Heera Singh Lodhi
 * @date 12-07-2024
 * @param message: string
 * @returns jsx
 * @description
 */

import Logo from "@/components/logo";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-15 px-4 border-b sahdow-sm bg-white flex items-center">
      <div
        className={`md:max-x-screen-2xl mx-auto flex items-center justify-between w-full`}
      >
        <Logo />
        <div
          className={`space-x-4 md:block md:w-auto flex items-center justify-center w-full`}
        >
          <button className={`my-4 bg-black text-white px-3 py-2 rounded-md`}>
            <Link href={`/sign-in`}>Login</Link>
          </button>
          <button className={`my-4 bg-black text-white px-3 py-2 rounded-md`}>
            <Link href={`/sign-up`}>Get taskify for free</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

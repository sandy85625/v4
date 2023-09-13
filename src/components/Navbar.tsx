'use client'

import Link from "next/link";
import React, { useState, useEffect } from "react";
import SignInButton from "./SignInButton";
import { getSession } from 'next-auth/react';
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import { Session } from "next-auth";
import { useTheme } from 'next-themes'

type Props = {};

const Navbar = (props: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const { theme } = useTheme()

  useEffect(() => {
    // Fetch the session on the client side
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-center h-full gap-2 px-8 mx-auto sm:justify-between max-w-7xl">
        <Link href="/explore" className="items-center hidden gap-2 sm:flex">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white">
            scripty.live
          </p>
        </Link>
        <div className="flex items-center">
          {theme === 'light' ? (
            <>
              <Link href="/explore" className="hover:bg-black hover:text-white mx-5">
                Explore
              </Link>
              {session?.user && (
                <>
                  <Link href="/create" className="hover:bg-black hover:text-white mr-5">
                    Generate Script
                  </Link>
                  <Link href="/settings" className="hover:bg-black hover:text-white mr-5">
                    Settings
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link href="/explore" className={`hover:bg-white hover:text-black mr-5`}>
                Explore
              </Link>
              {session?.user && (
                <>
                  <Link href="/create" className="hover:bg-white hover:text-black mr-5">
                    Generate Script
                  </Link>
                  <Link href="/settings" className="hover:bg-white hover:text-black mr-5">
                    Settings
                  </Link>
                </>
              )}
            </>
          )}
          <ThemeToggle className="mr-5" />
          <div className="flex items-center">
            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

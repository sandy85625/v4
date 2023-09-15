'use client'

import Link from "next/link";
import React, { useState, useEffect } from "react";
import SignInButton from "./SignInButton";
import { getSession } from 'next-auth/react';
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import { Session } from "next-auth";
import { useTheme } from 'next-themes'
import { Menu } from "lucide-react";

type Props = {};

const Navbar = (props: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState<boolean>(false);
  const { theme } = useTheme()

  useEffect(() => {
    // SetWidth
    setIsNavbarOpen(window.innerWidth > 640);

    // Fetch the session on the client side
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 bg-white dark:bg-gray-950 z-[10] h-fit border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] dark:border-white">
            contents.cafe
          </p>
        </Link>

        {/* Mobile Hamburger Menu */}
        <div className="sm:hidden">
          <Menu size={24} onClick={() => setIsNavbarOpen(!isNavbarOpen)} />
        </div>

        {/* Mobile Links Popup */}
        <div className={`fixed top-0 left-0 w-full h-full bg-white dark:bg-gray-950 z-[20] flex flex-col items-center justify-center ${isNavbarOpen ? "" : "hidden"} sm:hidden`} onClick={() => setIsNavbarOpen(false)}>
          {/* Close the menu when a link is clicked */}
          {themeLinks(theme!, session).map((item) => (
            <Link key={item.href} href={item.href} className={`${item.classes}`} onClick={() => setIsNavbarOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>

        {/* Non-mobile view */}
        <div className="hidden sm:flex items-center">
          {themeLinks(theme!, session).map((item) => (
            <Link key={item.href} href={item.href} className={`${item.classes} sm:mx-2 text-sm sm:text-base`}>
              {item.label}
            </Link>
          ))}
        </div>
        
        {/* Always visible elements */}
        <div className="flex items-center">
          <ThemeToggle className="mr-5 sm:mr-2" />

          {/* User actions */}
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </nav>
  );
};

// Helper function to return theme-specific links
const themeLinks = (theme: string, session: Session | null) => {
  let baseLinks = [
    {
      label: "Explore",
      href: "/explore",
      classes: theme === 'light' ? "hover:bg-black hover:text-white mx-5" : "hover:bg-white hover:text-black mr-5"
    },
    {
      label: "Generate Content Ideas",
      href: "/create",
      classes: theme === 'light' ? "hover:bg-black hover:text-white mx-5" : "hover:bg-white hover:text-black mr-5"
    },
    {
      label: "Help Center",
      href: "/help",
      classes: theme === 'light' ? "hover:bg-black hover:text-white mx-5" : "hover:bg-white hover:text-black mr-5"
    }
  ];

  if (session?.user) {
    baseLinks.push(
      {
        label: "Settings",
        href: "/settings",
        classes: theme === 'light' ? "hover:bg-black hover:text-white mx-5" : "hover:bg-white hover:text-black mr-5"
      }
    );
  }

  return baseLinks;
};

export default Navbar;
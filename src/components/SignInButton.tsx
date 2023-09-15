"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

type Props = {};

const SignInButton = (props: Props) => {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        signIn("google");
      }}
      className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-4 py-1 sm:py-1 rounded"
    >
      Login/Signup
    </Button>
  );
};

export default SignInButton;

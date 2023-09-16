import SignInButton from '@/components/SignInButton';
import { getAuthSession } from '@/lib/auth';
import { ChevronDown } from 'lucide-react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import React from 'react'

type Props = {}

export const metadata: Metadata = {
    title: "Login | Contents.cafe",
    description: 'Generate Content Ideas using AI. Influencers, Content Creators, Marketers, Advertisers can use it to generate content ideas for their media channels.'
  };

const SignInComponent
 = async (props: Props) => {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/create");
  }
  return (
    <div className='flex-grow'>
        <div className="flex flex-col h-screen items-center justify-center space-y-4">
            <p className='mx-5 text-center md:mx-0'>Please signup for generating content ideas! It's free to try!</p>
            <h2 className="text-2xl font-bold">SignUp for Free</h2>
            <ChevronDown className="w-6 h-6 text-gray-700" />
            <SignInButton />
        </div>
    </div>
  )
}

export default SignInComponent

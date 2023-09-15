import SignInButton from '@/components/SignInButton';
import { ChevronDown } from 'lucide-react';
import { Metadata } from 'next';

import React from 'react'

type Props = {}

export const metadata: Metadata = {
    title: "Login | Content.cafe",
    description: 'Generate Content Ideas using AI. Influencers, Content Creators, Marketers, Advertisers can use it to generate content ideas for their media channels.'
  };

const SignInComponent
 = (props: Props) => {
  return (
    <div className='flex-grow'>
        <div className="flex flex-col h-screen items-center justify-center space-y-4">
            <p>Please signup for generating content ideas! It's free to try!</p>
            <h2 className="text-2xl font-bold">SignUp for Free</h2>
            <ChevronDown className="w-6 h-6 text-gray-700" />
            <SignInButton />
        </div>
    </div>
  )
}

export default SignInComponent

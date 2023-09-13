"use client"

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import Link from "next/link";

import TopicSideBar from "@/components/TopicSideBar";
import MainSummary from "@/components/MainSummary";
import { Idea, Subidea, Topic } from '@prisma/client';

type Props = {
    topic: Topic & {
        ideas: (Idea & {
          subideas: Subidea[];
        })[];
      };
    idea: Idea;
    ideaIndex: number;
    subidea: Subidea;
    subideaIndex: number;
    prevSubidea?: Subidea; // Using ? to indicate it might be optional
    nextSubidea?: Subidea; // Using ? to indicate it might be optional
  };

const TopicPageComponent = ({ 
    topic, 
    idea, 
    ideaIndex, 
    subidea, 
    subideaIndex, 
    prevSubidea, 
    nextSubidea 
  }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div>
            {/* Mobile Hamburger Menu */}
            <div className="sm:hidden p-4">
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <Menu size={24} />
                </button>
            </div>

            {/* Sidebar: Hidden on small devices, displayed as a popup when hamburger is clicked */}
            <div className={`${isSidebarOpen ? "" : "hidden"} sm:block`}>
                <TopicSideBar topic={topic} currentSubideaId={subidea.id} />
            </div>

            {/* Content */}
            <div className="sm:ml-[400px] px-4 sm:px-8">
                <div className="flex">
                    <MainSummary idea={idea} ideaIndex={ideaIndex} subidea={subidea} subideaIndex={subideaIndex} />
                </div>

                <div className="flex-[1] h-[1px] mt-4 text-gray-500 bg-gray-500" />
                <div className="flex pb-8">
            {prevSubidea && (
              <Link
                href={`/course/${topic.id}/${ideaIndex}/${subideaIndex - 1}`}
                className="flex mt-4 mr-auto w-fit"
              >
                <div className="flex items-center">
                  <ChevronLeft className="w-6 h-6 mr-1" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-secondary-foreground/60">
                      Previous
                    </span>
                    <span className="text-xl font-bold">
                      {prevSubidea.name}
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {nextSubidea && (
              <Link
                href={`/course/${topic.id}/${ideaIndex}/${subideaIndex + 1}`}
                className="flex mt-4 ml-auto w-fit"
              >
                <div className="flex items-center">
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-secondary-foreground/60">
                      Next
                    </span>
                    <span className="text-xl font-bold">
                      {nextSubidea.name}
                    </span>
                  </div>
                  <ChevronRight className="w-6 h-6 ml-1" />
                </div>
              </Link>
            )}
          </div>
        </div>
    </div>
  )
}

export default TopicPageComponent
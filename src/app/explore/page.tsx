import ExploreTopicCard from "@/components/ExploreTopicCard";
import { prisma } from "@/lib/db";
import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Explore Content Ideas | Contents.cafe",
  description: 'Generate Content Ideas using AI. Influencers, Content Creators, Marketers, Advertisers can use it to generate content ideas for their media channels.'
};

const ExplorePage = async (props: Props) => {
  const topics = await prisma.topic.findMany({
    include: {
      ideas: {
        include: { subideas: true },
      },
    },
  });
  return (
    <div className="py-8 mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
          <h1 className="text-2xl md:text-4xl font-semibold text-center leading-tight md:text-left my-2 md:my-4">
            Explore Ideas
          </h1>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 place-items-center">
          {topics.map((topic) => {
              return <ExploreTopicCard topic={topic} key={topic.id} className="h-[300px] w-full sm:w-[300px] max-w-[300px]" />
          })}
      </div>
    </div>
  );
};

export default ExplorePage;

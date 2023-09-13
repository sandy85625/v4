import ExploreTopicCard from "@/components/ExploreTopicCard";
import { prisma } from "@/lib/db";
import React from "react";

type Props = {};

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        {topics.map((topic) => {
          return <ExploreTopicCard topic={topic} key={topic.id} />;
        })}
      </div>
    </div>
  );
};

export default ExplorePage;

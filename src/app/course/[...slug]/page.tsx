import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import TopicPageComponent from "@/components/TopicPageComponent";

type Props = {
  params: {
    slug: string[];
  };
};

const TopicPage = async ({ params: { slug } }: Props) => {
  const [topicId, ideaIndexParam, subideaIndexParam] = slug;
  const topic = await prisma.topic.findUnique({
    where: { id: topicId },
    include: {
      ideas: {
        include: {
          subideas: {
            include: {  likes: true },
          },
        },
      },
    },
  });
  if (!topic) {
    return redirect("/explore");
  }
  let ideaIndex = parseInt(ideaIndexParam);
  let subideaIndex = parseInt(subideaIndexParam);

  const idea = topic.ideas[ideaIndex];
  if (!idea) {
    return redirect("/explore");
  }
  const subidea = idea.subideas[subideaIndex];
  if (!subidea) {
    return redirect("/explore");
  }
  const nextSubidea = idea.subideas[subideaIndex + 1];
  const prevSubidea = idea.subideas[subideaIndex - 1];
  
  return (
    <TopicPageComponent 
      topic={topic} 
      idea={idea} 
      ideaIndex={ideaIndex} 
      subidea={subidea} 
      subideaIndex={subideaIndex} 
      prevSubidea={prevSubidea} 
      nextSubidea={nextSubidea} 
    />
  );
};

export default TopicPage;

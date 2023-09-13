import { cn } from "@/lib/utils";
import { Subidea, Idea, Topic } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";

type Props = {
  topic: Topic & {
    ideas: (Idea & {
      subideas: Subidea[];
    })[];
  };
  currentSubideaId: string;
};

const TopicSideBar = async ({ topic, currentSubideaId }: Props) => {
  return (
    <div className="w-[400px] absolute top-1/2 -translate-y-1/2 p-6 rounded-r-3xl bg-secondary">
      <h1 className="text-4xl font-bold">{topic.name}</h1>
      {topic.ideas.map((idea, ideaIndex) => {
        return (
          <div key={idea.id} className="mt-4">
            <h2 className="text-sm uppercase text-secondary-foreground/60">
              Idea {ideaIndex + 1}
            </h2>
            <h2 className="text-2xl font-bold">{idea.name}</h2>
            {idea.subideas.map((subidea, subideaIndex) => {
              return (
                <div key={subidea.id}>
                  <Link
                    href={`/course/${topic.id}/${ideaIndex}/${subideaIndex}`}
                    className={cn("text-secondary-foreground/60", {
                      "text-green-500 font-bold":
                        subidea.id === currentSubideaId,
                    })}
                  >
                    {subidea.name}
                  </Link>
                </div>
              );
            })}
            <Separator className="mt-2 text-gray-500 bg-gray-500" />
          </div>
        );
      })}
    </div>
  );
};

export default TopicSideBar;

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

const TopicSideBar = ({ topic, currentSubideaId }: Props) => {
  return (
    <div className="w-screen sm:w-[400px] h-[calc(100vh-36px)] sm:h-[600px] overflow-y-auto absolute top-1/2 -translate-y-1/2 p-4 my-24 sm:p-6 sm:my-4 rounded-r-3xl bg-secondary">
        <h1 className="text-3xl sm:text-4xl font-bold">{topic.name}</h1>
        {topic.ideas.map((idea, ideaIndex) => {
            return (
                <div key={idea.id} className="mt-3 sm:mt-4">
                    <h2 className="text-xs sm:text-sm uppercase text-secondary-foreground/60">
                        Idea {ideaIndex + 1}
                    </h2>
                    <h2 className="text-xl sm:text-2xl font-bold">{idea.name}</h2>
                    {idea.subideas.map((subidea, subideaIndex) => {
                        return (
                            <div key={subidea.id}>
                                <li>
                                    <Link
                                        href={`/course/${topic.id}/${ideaIndex}/${subideaIndex}`}
                                        className={cn("text-secondary-foreground/60", {
                                            "text-green-500 font-bold": subidea.id === currentSubideaId,
                                        })}
                                    >
                                        {subidea.name}
                                    </Link>
                                </li>
                            </div>
                        );
                    })}
                    <Separator className="mt-1 sm:mt-2 text-gray-500 bg-gray-500" />
                </div>
            );
        })}
    </div>

  );
};

export default TopicSideBar;

import { Subidea, Topic, Idea } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  topic: Topic & {
    ideas: (Idea & {
      subideas: Subidea[];
    })[];
  };
  className?: string;
};

const ExploreTopicCard = async ({ topic, className }: Props) => {
  return (
    <div className={`mx-2 sm:mx-4 border rounded-lg border-secondary overflow-hidden ${className}`}>
        <div className="relative">
            <Link
                href={`/course/${topic.id}/0/0`}
                className="relative block w-fit"
            >
                <Image
                    className="overflow-hidden h-[200px] w-full sm:w-[300px] max-w-[300px]"
                    src={topic.image || ""}
                    layout="fixed"
                    objectFit="cover"
                    width={300}
                    height={300}
                    alt="picture of the course"
                />
                
            </Link>
            <span className="absolute px-2 py-1 text-white rounded-md bg-black/60 w-fit bottom-2 left-2 right-2">
                    {topic.name}
                </span>
        </div>

        <div className="p-4">
            <h4 className="text-sm text-secondary-foreground/60">Content Idea(s)</h4>
            <div className="space-y-1">
                <Link
                    href={`/course/${topic.id}/0/0`}
                    className="block underline w-fit"
                >
                    {topic.name}
                </Link>
            </div>
        </div>
    </div>
  );
};

export default ExploreTopicCard;

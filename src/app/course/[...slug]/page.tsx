import TopicSideBar from "@/components/TopicSideBar";
import MainSummary from "@/components/MainSummary";
import { prisma } from "@/lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

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
    <div>
      <div>
      <TopicSideBar topic={topic} currentSubideaId={subidea.id} />
        <div className="ml-[400px] px-8">
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
    </div>
  );
};

export default TopicPage;

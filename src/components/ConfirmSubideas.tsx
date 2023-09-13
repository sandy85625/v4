"use client";
import { Idea, Subidea, Topic } from "@prisma/client";
import React from "react";
import SubideaCard, { SubideaCardHandler } from "./SubideaCard";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

type Props = {
  topic: Topic & {
    ideas: (Idea & {
      subideas: Subidea[];
    })[];
  };
};

const ConfirmSubIdeas = ({ topic }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const subideaRefs: Record<string, React.RefObject<SubideaCardHandler>> = {};
  topic.ideas.forEach((idea) => {
    idea.subideas.forEach((subidea) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      subideaRefs[subidea.id] = React.useRef(null);
    });
  });
  const [completedSubideas, setCompletedSubideas] = React.useState<Set<String>>(
    new Set()
  );
  const totalChaptersCount = React.useMemo(() => {
    return topic.ideas.reduce((acc, idea) => {
      return acc + idea.subideas.length;
    }, 0);
  }, [topic.ideas]);

  return (
    <div className="w-full mt-4">
      {topic.ideas.map((idea, ideaIndex) => {
        return (
          <div key={idea.id} className="mt-5">
            <h2 className="text-sm uppercase text-secondary-foreground/60 mx-2">
              Idea {ideaIndex + 1}
            </h2>
            <h3 className="text-2xl font-bold mx-2 ">{idea.name}</h3>
            <div className="mt-3 mx-2">
              {idea.subideas.map((subidea, subideaIndex) => {
                return (
                  <SubideaCard
                    completedsubideas={completedSubideas}
                    setCompletedChapters={setCompletedSubideas}
                    ref={subideaRefs[subidea.id]}
                    key={subidea.id}
                    subidea={subidea}
                    subideaIndex={subideaIndex}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-center mt-4">
        <Separator className="flex-[1]" />
        <div className="flex items-center mx-4">
          <Link
            href="/create"
            className={buttonVariants({
              variant: "secondary",
            })}
          >
            <ChevronLeft className="w-4 h-4 mr-2" strokeWidth={4} />
            Back
          </Link>
          {totalChaptersCount === completedSubideas.size ? (
            <Link
              className={buttonVariants({
                className: "ml-4 font-semibold",
              })}
              href={`/course/${topic.id}/0/0`}
            >
              Save & Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          ) : (
            <Button
              type="button"
              className="ml-4 font-semibold"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                Object.values(subideaRefs).forEach((ref) => {
                  ref.current?.triggerLoad();
                });
              }}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Generate"}
              <ChevronRight className="w-4 h-4 ml-2" strokeWidth={4} />
            </Button>
          )}
        </div>
        <Separator className="flex-[1]" />
      </div>
    </div>
  );
};

export default ConfirmSubIdeas;

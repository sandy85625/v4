import ConfirmChapters from "@/components/ConfirmSubideas";
import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Info } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    topicId: string;
  };
};

const CreateSubideas = async ({ params: { topicId } }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/explore");
  }
  const topic = await prisma.topic.findUnique({
    where: {
      id: topicId,
    },
    include: {
      ideas: {
        include: {
          subideas: true,
        },
      },
    },
  });
  if (!topic) {
    return redirect("/create");
  }
  return (
    <div className="flex flex-col items-start max-w-xl mx-auto my-6 sm:my-16">
      <h5 className="text-xs mx-2 sm:text-sm uppercase text-seconday-foreground/60">
          Content Ideas
      </h5>
      <h1 className="text-3xl mx-2 sm:text-5xl font-bold">{topic.name}</h1>

      <div className="flex p-3 sm:p-4 mt-3 mx-2 sm:mt-5 border-none bg-secondary">
          <Info className="w-8 sm:w-12 h-8 sm:h-12 mr-2 sm:mr-3 text-blue-400" />
          <div className="text-sm sm:text-base">
              We generated sub-ideas for each of your ideas. Look over them and then
              click the Button to confirm and continue
          </div>
      </div>
      <ConfirmChapters topic={topic} />
    </div>
  );
};

export default CreateSubideas;

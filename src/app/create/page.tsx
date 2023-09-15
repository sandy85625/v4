import { getAuthSession } from "@/lib/auth";
import React from "react";
import { redirect } from "next/navigation";
import { InfoIcon } from "lucide-react";
import CreateTopicForm from "@/components/CreateTopicForm";
import { checkSubscription } from "@/lib/subscription";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Generate Content Ideas | Contents.cafe",
  description: 'Generate Content Ideas using AI. Influencers, Content Creators, Marketers, Advertisers can use it to generate content ideas for their media channels.'
};

const CreatePage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/signin");
  }
  const isPro = await checkSubscription();
  return (
    <div className="flex flex-col items-start max-w-xl px-4 mx-auto my-8 sm:px-8 sm:my-16 md:px-0">
      <h1 className="self-center text-2xl font-bold text-center sm:text-4xl md:text-5xl lg:text-6xl">
        Script writing made Easy!
      </h1>
      <div className="flex flex-wrap p-2 mt-4 border-none bg-secondary sm:flex-nowrap sm:p-4 sm:mt-5">
        <InfoIcon className="w-8 h-8 mr-2 text-blue-400 sm:w-10 sm:h-10 sm:mr-3 md:w-12 md:h-12" />
        <div className="text-sm sm:text-base md:text-lg">
          Enter in a script title, or what you want to write a script about. Then enter a
          list of scenes, which are the specifics you want. And our AI
          will generate the script for you!
        </div>
      </div>

      <CreateTopicForm isPro={isPro} />
    </div>
  );
};

export default CreatePage;

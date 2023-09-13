import { getAuthSession } from "@/lib/auth";
import React from "react";
import { redirect } from "next/navigation";
import { InfoIcon } from "lucide-react";
import CreateTopicForm from "@/components/CreateTopicForm";
import { checkSubscription } from "@/lib/subscription";

type Props = {};

const CreatePage = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/explore");
  }
  const isPro = await checkSubscription();
  return (
    <div className="flex flex-col items-start max-w-xl px-8 mx-auto my-16 sm:px-0">
      <h1 className="self-center text-3xl font-bold text-center sm:text-6xl">
        Script writing made Easy!
      </h1>
      <div className="flex p-4 mt-5 border-none bg-secondary">
        <InfoIcon className="w-12 h-12 mr-3 text-blue-400" />
        <div>
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

import { Subidea, Idea } from "@prisma/client";
import React from "react";

type Props = {
  subidea: Subidea;
  idea: Idea;
  ideaIndex: number;
  subideaIndex: number;
};

const MainSummary = ({
  idea,
  ideaIndex,
  subidea,
  subideaIndex,
}: Props) => {
  return (
    <div className="flex-[2] mt-16">
      <h4 className="text-sm uppercase text-secondary-foreground/60">
        Idea {ideaIndex + 1} &bull; Sub-Idea {subideaIndex + 1}
      </h4>
      <h1 className="text-4xl font-bold">{subidea.name}</h1>
      <div className="mt-4">
        <p className="mt-2 text-secondary-foreground/80">{subidea.summary}</p>
      </div>
    </div>
  );
};

export default MainSummary;

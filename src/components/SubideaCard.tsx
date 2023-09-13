"use client";
import { cn } from "@/lib/utils";
import { Subidea } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useToast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";

type Props = {
  subidea: Subidea;
  subideaIndex: number;
  completedsubideas: Set<String>;
  setCompletedChapters: React.Dispatch<React.SetStateAction<Set<String>>>;
};

export type SubideaCardHandler = {
  triggerLoad: () => void;
};

const SubideaCard = React.forwardRef<SubideaCardHandler, Props>(
  ({ subidea, subideaIndex, setCompletedChapters, completedsubideas }, ref) => {
    const { toast } = useToast();
    const [success, setSuccess] = React.useState<boolean | null>(null);
    const { mutate: getChapterInfo, isLoading } = useMutation({
      mutationFn: async () => {
        const response = await axios.post("/api/chapter/getInfo", {
          subideaId: subidea.id,
        });
        return response.data;
      },
    });

    const addChapterIdToSet = React.useCallback(() => {
      setCompletedChapters((prev) => {
        const newSet = new Set(prev);
        newSet.add(subidea.id);
        return newSet;
      });
    }, [subidea.id, setCompletedChapters]);

    React.useEffect(() => {
      if (subidea.summary) {
        setSuccess(true);
        addChapterIdToSet;
      }
    }, [subidea, addChapterIdToSet]);

    React.useImperativeHandle(ref, () => ({
      async triggerLoad() {
        if (subidea.summary) {
          addChapterIdToSet();
          return;
        }
        getChapterInfo(undefined, {
          onSuccess: () => {
            setSuccess(true);
            addChapterIdToSet();
          },
          onError: (error) => {
            console.error(error);
            setSuccess(false);
            toast({
              title: "Error",
              description: "There was an error loading your chapter",
              variant: "destructive",
            });
            addChapterIdToSet();
          },
        });
      },
    }));
    return (
      <div
        key={subidea.id}
        className={cn("px-4 py-2 mt-2 rounded flex justify-between", {
          "bg-secondary": success === null,
          "bg-red-500": success === false,
          "bg-green-500": success === true,
        })}
      >
        <h5>{subidea.name}</h5>
        {isLoading && <Loader2 className="animate-spin" />}
      </div>
    );
  }
);

SubideaCard.displayName = "SubideaCard";

export default SubideaCard;

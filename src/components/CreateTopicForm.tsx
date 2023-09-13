"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { createChaptersSchema } from "@/validators/topic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Plus, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import SubscriptionAction from "./SubscriptionAction";
import { Loader2 } from "lucide-react";

type Props = { isPro: boolean };

type Input = z.infer<typeof createChaptersSchema>;

const CreateTopicForm = ({ isPro }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutate: createChapters, isLoading } = useMutation({
    mutationFn: async ({ title, ideas }: Input) => {
      const response = await axios.post("/api/course/createChapters", {
        title,
        ideas,
      });
      return response.data;
    },
  });
  const form = useForm<Input>({
    resolver: zodResolver(createChaptersSchema),
    defaultValues: {
      title: "",
      ideas: ["", "", ""],
    },
  });

  function onSubmit(data: Input) {
    if (data.ideas.some((idea) => idea === "")) {
      toast({
        title: "Error",
        description: "Please fill all the Tags",
        variant: "destructive",
      });
      return;
    }
    createChapters(data, {
      onSuccess: ({ topic_id }) => {
        toast({
          title: "Success",
          description: "Ideas created successfully",
        });
        router.push(`/create/${topic_id}`);
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      },
    });
  }

  form.watch();

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                  <FormLabel className="flex-[1] text-xl">Topic</FormLabel>
                  <FormControl className="flex-[6]">
                    <Input
                      placeholder="Enter the main topic/type of the script"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />

          <AnimatePresence>
            {form.watch("ideas").map((_, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    height: { duration: 0.2 },
                  }}
                >
                  <FormField
                    key={index}
                    control={form.control}
                    name={`ideas.${index}`}
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row">
                          <FormLabel className="flex-[1] text-xl">
                            Tag {index + 1}
                          </FormLabel>
                          <FormControl className="flex-[6]">
                            <Input
                              placeholder="Enter your niche/area of interest(s)"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              <Button
                type="button"
                variant="secondary"
                className="font-semibold"
                onClick={() => {
                  form.setValue("ideas", [...form.watch("ideas"), ""]);
                }}
              >
                Add Tags
                <Plus className="w-4 h-4 ml-2 text-green-500" />
              </Button>

              <Button
                type="button"
                variant="secondary"
                className="font-semibold ml-2"
                onClick={() => {
                  form.setValue("ideas", form.watch("ideas").slice(0, -1));
                }}
              >
                Remove Tags
                <Trash className="w-4 h-4 ml-2 text-red-500" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full mt-6"
            size="lg"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : 'Next'}
          </Button>
        </form>
      </Form>
      {!isPro && <SubscriptionAction />}
    </div>
  );
};

export default CreateTopicForm;

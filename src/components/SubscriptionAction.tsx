"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import axios from "axios";
import { useToast } from "./ui/use-toast";

type Props = {};

const SubscriptionAction = (props: Props) => {
  const { data } = useSession();
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast({
        title: "Billing Error",
        description: "Please retry! If fund was deducted from your account, it will be refunded within 3-4 business days.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center w-full sm:w-1/2 p-4 mx-auto mt-4 rounded-md bg-secondary">
      {data?.user.credits} / 10 Free Generations
      <Progress
        className="mt-2"
        value={data?.user.credits ? (data.user.credits / 10) * 100 : 0}
      />
      <Button
        disabled={loading}
        onClick={handleSubscribe}
        className="mt-3 font-bold text-white transition bg-gradient-to-tr from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
      >
        Upgrade
        <Zap className="fill-white ml-2" />
      </Button>
    </div>
  );
};

export default SubscriptionAction;

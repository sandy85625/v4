"use client";
import React from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { useToast } from "./ui/use-toast";

type Props = { isPro: boolean };

const SubscriptionButton = ({ isPro }: Props) => {
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
    <Button className="mt-4" disabled={loading} onClick={handleSubscribe}>
      {isPro ? "Manage Subscriptions" : "Upgrade"}
    </Button>
  );
};

export default SubscriptionButton;

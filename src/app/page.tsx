import CallToAction from "@/components/CallToActionComponent";
import ContactUsComponent from "@/components/ContactUsComponent";
import FeatureComponent from "@/components/FeatureComponent";
import HeroComponent from "@/components/HeroComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content.cafe | Brainstorm Ideas for your content",
  description: 'Generate Content Ideas using AI. Influencers, Content Creators, Marketers, Advertisers can use it to generate content ideas for their media channels.'
};


export default function Home() {
  return (
    <>
      <HeroComponent />
      <FeatureComponent />
      <CallToAction />
      <ContactUsComponent />
    </>
  )
}

import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Provider } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import Head from "next/head";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contents.cafe | Brainstorm content Ideas using AI for your social medias, Advertisments, Marketing campaign and more!",
  description: 'Generate Content Ideas using AI. Influencers, Content Creators, Marketers, Advertisers can use it to generate content ideas for their media channels.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://contents.cafe" />
      </Head>
      <body className={cn(lexend.className, "antialiased flex flex-col min-h-screen pt-16")}>
          <Provider>
              <Navbar />
              <div className="flex-grow">
                  {children}
              </div>
              <Toaster />
              <Footer />
          </Provider>
      </body>
  </html>
  );
}

import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Provider } from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

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

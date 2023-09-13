// /api/course/createChapters

import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/topic";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/auth";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new NextResponse("unauthorised", { status: 401 });
    }
    const isPro = await checkSubscription();
    if (session.user.credits <= 0 && !isPro) {
      return new NextResponse("no credits", { status: 402 });
    }
    const body = await req.json();
    const { title, ideas } = createChaptersSchema.parse(body);

    type outputIdeas = {
      title: string;
      subideas: {
        subidea_title: string;
      }[];
    }[];

    let output_ideas: outputIdeas = await strict_output(
      "You are an AI capable of curating topic ideas for creating short form social media content, coming up with relevant ideas, and sub ideas from a topic and a list of tags",
      new Array(ideas.length).fill(
        `It is your job to create an idea about ${title}. The user has requested to generate ideas for each of the tags related to topic. Then, for each ideas, provide a detailed sub ideas that can be used to generate quality short form social media content that are fresh, creative and new. Each query should give quality ideas for creating social media content`
      ),
      {
        title: "title of the idea",
        subideas:
          "an array of ideas, each idea should have subidea_title key in the JSON object",
      }
    );

    const imageSearchTerm = await strict_output(
      "you are an AI capable of finding the most relevant image for the topic or idea",
      `Please provide a good image search term for the title of a topic about ${title}. This search term will be fed into the unsplash API, so make sure it is a good search term that will return good results`,
      {
        image_search_term: "a good search term for the title of the idea",
      }
    );

    const topic_image = await getUnsplashImage(
      imageSearchTerm.image_search_term
    );
    const topic = await prisma.topic.create({
      data: {
        name: title,
        image: topic_image,
      },
    });

    for (const idea of output_ideas) {
      const title = idea.title;
      const prismaUnit = await prisma.idea.create({
        data: {
          name: title,
          topicId: topic.id,
        },
      });
      await prisma.subidea.createMany({
        data: idea.subideas.map((subidea) => {
          return {
            name: subidea.subidea_title,
            ideaId: prismaUnit.id,
          };
        }),
      });
    }
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json({ topic_id: topic.id });
  } catch (error) {
    if (error instanceof ZodError) {
      return new NextResponse("invalid body", { status: 400 });
    }
    console.error(error);
  }
}

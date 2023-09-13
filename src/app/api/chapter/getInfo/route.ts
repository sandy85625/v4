// /api/chapter/getInto

import { prisma } from "@/lib/db";
import { strict_output } from "@/lib/gpt";
import { NextResponse } from "next/server";
import { z } from "zod";

const bodyParser = z.object({
  subideaId: z.string(),
});

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { subideaId } = bodyParser.parse(body);
    const subidea = await prisma.subidea.findUnique({
      where: {
        id: subideaId,
      },
    });
    if (!subidea) {
      return NextResponse.json(
        {
          success: false,
          error: "Subidea not found",
        },
        { status: 404 }
      );
    }

    const { summary }: { summary: string } = await strict_output(
      "You are an AI capable of writing a script about media content ideas to create social media contents",
      "Write one good, detailed, specific and creative content script for creating a new social media content about: " +
      subidea.name +
      "in about 250 words or less. Do not use introduction",
      { summary: "one good, detailed, specific and creative script about the idea" }
    );
    
    // await prisma.likes.createMany({
    //   data: like.map((question) => {
    //     let options = [
    //       question.answer,
    //       question.option1,
    //       question.option2,
    //       question.option3,
    //     ];
    //     options = options.sort(() => Math.random() - 0.5);
    //     return {
    //       question: question.question,
    //       answer: question.answer,
    //       options: JSON.stringify(options),
    //       chapterId: chapterId,
    //     };
    //   }),
    // });

    await prisma.subidea.update({
      where: { id: subideaId },
      data: {
        summary: summary,
      },
    });

    return NextResponse.json({ success: true, subidea: subidea, summary: summary });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid body",
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: error,
        },
        { status: 500 }
      );
    }
  }
}

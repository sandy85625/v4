import { z } from "zod";

export const createChaptersSchema = z.object({
  title: z.string().max(100),
  ideas: z.array(z.string()),
});

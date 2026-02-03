import { z } from "zod";

export const richTextSchema = z.object({
  type: z.literal("doc"),
  content: z.array(z.any()),
});

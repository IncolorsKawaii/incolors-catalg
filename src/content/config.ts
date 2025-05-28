import { defineCollection, z } from "astro:content";

const productos = defineCollection({
  schema: z.object({
    title: z.string(),
    price: z.number(),
    currency: z.string(),
    available: z.boolean(),
    tags: z.array(z.string()),
    colors: z.array(z.string()),
    measures: z.object({
      alto: z.string(),
      ancho: z.string()
    }),
    images: z.array(z.string()),
	 coverImage: z.string().optional(),
    description: z.string()
  })
});

export const collections = {
  productos,
};

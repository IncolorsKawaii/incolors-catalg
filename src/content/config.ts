import { defineCollection, z } from "astro:content";

const productos = defineCollection({
  schema: z.object({
    title: z.string(),
    codigo: z.string().optional(),
    price: z.number(),
    currency: z.string(),
    available: z.boolean(),
    stock: z.number().optional(),
    destacado: z.boolean().optional(),
    fecha: z.date().optional(),
    tags: z.array(z.string()),
    colors: z.array(z.string()).optional(),
    diseño: z.string().optional(),
    measures: z.object({
      alto: z.string(),
      ancho: z.string(),
      profundidad: z.string().optional()
    }),
    images: z.array(z.string()),
	 coverImage: z.string().optional(),
    description: z.string()
  })
});

export const collections = {
  productos,
};

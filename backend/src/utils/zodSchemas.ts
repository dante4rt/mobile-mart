import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    sku: z.string().min(1, "SKU is required"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    price: z.number().positive("Price must be a positive number"),
    imageUrl: z.string().url("Invalid image URL").optional(),
    stockQuantity: z.number().int().positive().optional(),
    minimumOrderQuantity: z.number().int().positive().optional().default(1),
    brand: z.string().optional(),
    condition: z.string().optional(),
});

export const productSlugSchema = z.string().min(1, "Slug is required");

export const getProductsInputSchema = z.object({
    brands: z.array(z.string()).optional(),
    conditions: z.array(z.string()).optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
});
import { publicProcedure, router } from '../trpc';
import { createProductSchema, productSlugSchema } from '../../utils/zodSchemas';
import { generateULID, generateSlug } from '../../utils/generators';

export const productRouter = router({
    getProducts: publicProcedure.query(async ({ ctx }) => {
        return ctx.prisma.product.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }),

    getProductBySlug: publicProcedure
        .input(productSlugSchema)
        .query(async ({ input: slug, ctx }) => {
            return ctx.prisma.product.findUnique({
                where: { slug },
            });
        }),

    createProduct: publicProcedure
        .input(createProductSchema)
        .mutation(async ({ input, ctx }) => {
            const newProduct = await ctx.prisma.product.create({
                data: {
                    id: generateULID(),
                    slug: generateSlug(input.name),
                    ...input,
                    price: input.price,
                    stockQuantity: input.stockQuantity ?? 0,
                    brand: input.brand ?? 'Unknown',
                    condition: input.condition ?? 'new',
                },
            });
            return newProduct;
        }),
});
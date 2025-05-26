import { publicProcedure, router } from '../trpc';
import { createProductSchema, getProductsInputSchema, productSlugSchema } from '../../utils/zodSchemas';
import { generateULID, generateSlug } from '../../utils/generators';
import { Prisma } from '@prisma/client';

export const productRouter = router({
    getProducts: publicProcedure
        .input(getProductsInputSchema.optional())
        .query(async ({ input, ctx }) => {
            const where: Prisma.ProductWhereInput = {};
            const page = input?.page || 1;
            const limit = input?.limit || 10;
            const skip = (page - 1) * limit;

            if (input?.brands && input.brands.length > 0) {
                where.brand = { in: input.brands, mode: 'insensitive' };
            }
            if (input?.conditions && input.conditions.length > 0) {
                where.condition = { in: input.conditions, mode: 'insensitive' };
            }
            if (input?.minPrice !== undefined) {
                where.price = { ...where.price as Prisma.DecimalFilter, gte: new Prisma.Decimal(input.minPrice) };
            }
            if (input?.maxPrice !== undefined) {
                where.price = { ...where.price as Prisma.DecimalFilter, lte: new Prisma.Decimal(input.maxPrice) };
            }
            if (input?.search) {
                where.OR = [
                    { name: { contains: input.search, mode: 'insensitive' } },
                    { description: { contains: input.search, mode: 'insensitive' } },
                    { brand: { contains: input.search, mode: 'insensitive' } },
                    { sku: { contains: input.search, mode: 'insensitive' } },
                ];
            }

            const [products, totalCount] = await Promise.all([
                ctx.prisma.product.findMany({
                    where,
                    orderBy: { createdAt: 'desc' },
                    take: limit,
                    skip: skip,
                }),
                ctx.prisma.product.count({ where })
            ]);

            const totalPages = Math.ceil(totalCount / limit);

            return {
                products,
                pagination: {
                    page,
                    limit,
                    totalItems: totalCount,
                    totalPages,
                    hasNextPage: page < totalPages,
                    hasPreviousPage: page > 1
                }
            };
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
        }), getFilterOptions: publicProcedure.query(async ({ ctx }) => {
            const distinctBrands = await ctx.prisma.product.findMany({
                select: { brand: true },
                distinct: ['brand'],
            });
            const distinctConditions = await ctx.prisma.product.findMany({
                select: { condition: true },
                distinct: ['condition'],
            });

            return {
                brands: distinctBrands.map((p: { brand: string }) => p.brand!).sort(),
                conditions: distinctConditions.map((p: { condition: string }) => p.condition!).sort(),
            };
        }),
});
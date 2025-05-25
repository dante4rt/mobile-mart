import { publicProcedure, router } from './trpc';
import { productRouter } from './routers/product';

export const appRouter = router({
    product: productRouter,
    health: publicProcedure.query(() => 'OK'),
});

export type AppRouter = typeof appRouter;
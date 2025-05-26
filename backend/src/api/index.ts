import { publicProcedure, router } from './trpc';
import { productRouter } from './routers/product';
import { authRouter } from './routers/auth';

export const appRouter = router({
    product: productRouter,
    auth: authRouter,
    health: publicProcedure.query(() => 'OK'),
});

export type AppRouter = typeof appRouter;
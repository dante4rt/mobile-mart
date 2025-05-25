import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '../../../backend/src/api';

type RouterOutput = inferRouterOutputs<AppRouter>;
export type Product = RouterOutput['product']['getProducts'][number];
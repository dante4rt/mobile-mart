import { prisma } from '../db';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export interface Context {
    req: Request;
    prisma: typeof prisma;
}

export function createContext(opts: FetchCreateContextFnOptions): Record<string, unknown> {
    return {
        req: opts.req,
        prisma,
    };
}
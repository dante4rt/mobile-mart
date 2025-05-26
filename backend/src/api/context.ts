import { prisma } from '../db';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { verifyToken } from '../utils/auth';

export function createContext(opts: FetchCreateContextFnOptions): {
    req: Request;
    prisma: typeof prisma;
    user: { id: string; role: string } | null;
} {
    let user = null;

    const authHeader = opts.req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7);
        try {
            const decoded = verifyToken(token);
            user = {
                id: decoded.userId,
                role: decoded.role,
            };
        } catch (error) {
            console.error('Invalid token:', error);
        }
    }

    return {
        req: opts.req,
        prisma,
        user,
    };
}

export type Context = ReturnType<typeof createContext>;
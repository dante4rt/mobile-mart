import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../backend/src/api';

export const trpc = createTRPCReact<AppRouter>();
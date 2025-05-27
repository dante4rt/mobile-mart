import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@mobilemart/api-types";

export const trpc = createTRPCReact<AppRouter>();

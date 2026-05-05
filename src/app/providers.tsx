import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@ui/tooltip";
import { Toaster } from "@ui/toaster";
import { Toaster as Sonner } from "@ui/sonner";

/**
 * App-wide providers. Wrap the router with these so every page/section gets
 * data fetching, tooltips, and toast notifications.
 */
const queryClient = new QueryClient();

export const Providers = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

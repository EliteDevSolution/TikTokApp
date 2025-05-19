import React from 'react';
import { QueryClient } from "@tanstack/react-query";

// Create a dummy client for compatibility
export const trpc = {
  Provider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
};

export const trpcClient = {};

// Export a function to create a new query client
export const createQueryClient = () => new QueryClient();
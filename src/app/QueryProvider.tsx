"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const QueryProvider = ({ children }: PropsWithChildren) => {
  const options = {
    defaultOptions: {
      queries: {
        retry: 3,
        staleTime: 10 * 1000,
      },
    },
  };
  const [queryClient] = useState(() => new QueryClient(options));
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default QueryProvider;

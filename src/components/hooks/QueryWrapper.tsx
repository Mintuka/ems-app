"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
type Props = {
  children: ReactNode;
};
const queryClient = new QueryClient();
function QueryWrapper({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <ReactQueryDevtools initialIsOpen={false} />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
export default QueryWrapper;

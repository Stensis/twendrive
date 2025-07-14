// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "@/routes/routes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppRoutes />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

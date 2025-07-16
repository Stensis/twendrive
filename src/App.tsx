import { useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppRoutes from "@/routes/routes";
import { IdleTimerProvider } from 'react-idle-timer';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';
import { useToast } from '@/hooks/use-toast'; 

const queryClient = new QueryClient();

const AppWrapper = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [showWarning, setShowWarning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIdle = () => {
    dispatch(logout());
    localStorage.clear();
    setShowWarning(false);

    toast({
      title: "Session Expired",
      description: "You've been logged out due to inactivity.",
      variant: "destructive",
    });
  };

  const handlePrompt = () => {
    // User is about to go idle
    setShowWarning(true);

    // Auto logout after 30s if no action
    timeoutRef.current = setTimeout(() => {
      handleIdle();
    }, 30 * 1000); // 30 seconds
  };

  const handleActive = () => {
    // User became active before timeout
    setShowWarning(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <IdleTimerProvider
      timeout={15 * 60 * 1000}
      promptTimeout={30 * 1000} // triggers onPrompt 30s before idle
      onPrompt={handlePrompt}
      onIdle={handleIdle}
      onActive={handleActive}
      debounce={500}
    >
      {showWarning && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 text-yellow-800 p-4 rounded shadow-lg z-50">
          <p>You're about to be logged out in 30 seconds due to inactivity.</p>
        </div>
      )}

      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AppRoutes />
        </TooltipProvider>
      </QueryClientProvider>
    </IdleTimerProvider>
  );
};
export default AppWrapper;

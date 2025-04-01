
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RadioPage from "./pages/RadioPage";
import MediaLibraryPage from "./pages/MediaLibraryPage";
import NotFound from "./pages/NotFound";
import { MediaPlayerProvider } from "./contexts/MediaPlayerContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MediaPlayerProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/radio" element={<RadioPage />} />
            <Route path="/library" element={<MediaLibraryPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MediaPlayerProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

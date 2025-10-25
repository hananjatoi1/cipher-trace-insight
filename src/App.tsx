import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ParticleBackground } from "@/components/ParticleBackground";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Wallet from "./pages/Wallet";
import KYC from "./pages/KYC";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="flex min-h-screen w-full relative">
            <ParticleBackground />
            <AppSidebar />
            <main className="flex-1 relative z-10 scanlines">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/kyc" element={<KYC />} />
                <Route path="/risk" element={<Dashboard />} />
                <Route path="/network" element={<Dashboard />} />
                <Route path="/reports" element={<Dashboard />} />
                <Route path="/users" element={<Dashboard />} />
                <Route path="/settings" element={<Dashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

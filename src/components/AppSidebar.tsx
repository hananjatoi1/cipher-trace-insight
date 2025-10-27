import { Home, Search, Wallet, Users, ShieldAlert, Network, FileText, Settings, Lock } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Transaction Search", url: "/transactions", icon: Search },
  { title: "Wallet Tracker", url: "/wallet", icon: Wallet },
  { title: "KYC Tracing", url: "/kyc", icon: Lock, restricted: true },
  { title: "Risk Scoring", url: "/risk", icon: ShieldAlert },
  { title: "Network Graph", url: "/network", icon: Network },
  { title: "Reports", url: "/reports", icon: FileText },
  { title: "Users & Access", url: "/users", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent>
        <div className="p-5 border-b border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent relative overflow-hidden">
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-shimmer"></div>
          
          <div className="relative flex items-center gap-4 group">
            {/* Logo with glow effect */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:bg-primary/40 transition-all duration-700 animate-pulse"></div>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="CSB Logo" 
                  className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(99,102,241,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(99,102,241,0.6)] transition-all duration-500 group-hover:scale-105" 
                />
              </div>
            </div>
            
            {/* Text content */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-baseline gap-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-fade-in leading-tight">
                  CSB
                </h1>
                <span className="text-primary/40 font-light">|</span>
                <p className="text-lg font-semibold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent tracking-wide leading-tight">
                  CryptoTrace
                </p>
              </div>
              <p className="text-[11px] text-muted-foreground/80 uppercase tracking-[0.15em] font-medium mt-1.5 ml-0.5">
                Intelligence Platform
              </p>
            </div>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-primary/10 text-primary border border-primary/20 glow-primary"
                            : "hover:bg-sidebar-accent text-sidebar-foreground"
                        } ${item.restricted ? "opacity-70" : ""}`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                      {item.restricted && (
                        <Lock className="h-3 w-3 ml-auto text-destructive" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

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
        <div className="pt-6 pb-4 px-4 border-b border-primary/20 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm">
          <div className="flex items-center gap-3 group hover:scale-[1.02] transition-all duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500"></div>
              <img 
                src={logo} 
                alt="CSB Logo" 
                className="h-14 w-14 object-contain relative z-10 drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)] group-hover:drop-shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] transition-all duration-500" 
              />
            </div>
            <div className="flex-1 min-w-0 text-center">
              <p className="text-base font-semibold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent tracking-wide">
                CryptoTrace
              </p>
              <p className="text-[9px] text-muted-foreground/80 tracking-wider font-medium mt-1">
                Developed by Cyber Security Team – NIFTAC
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

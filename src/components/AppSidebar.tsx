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
          <div className="flex items-center justify-center gap-4 group">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-500 animate-pulse"></div>
              <div className="absolute inset-0 bg-secondary/10 rounded-full blur-2xl group-hover:blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <img 
                src={logo} 
                alt="PSS Logo" 
                className="h-16 w-16 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] group-hover:drop-shadow-[0_0_25px_rgba(var(--primary-rgb),0.6)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lg font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent tracking-wide group-hover:tracking-wider transition-all duration-300">
                CryptoTrace & Track
              </p>
              <p className="text-[10px] text-muted-foreground/80 tracking-wider font-medium mt-1.5 group-hover:text-muted-foreground/100 transition-colors duration-300">
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

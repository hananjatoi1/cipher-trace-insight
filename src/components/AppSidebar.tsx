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
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <img src={logo} alt="CSB Logo" className="h-12 w-12 object-contain" />
            <div>
              <h1 className="text-lg font-bold text-primary">CSB-CryptoTrace</h1>
              <p className="text-xs text-muted-foreground">Intelligence Platform</p>
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

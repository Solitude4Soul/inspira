"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, LogOut, Briefcase, UserSquare } from "lucide-react";
import { logout } from "@/lib/actions";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/portal/submissions?type=brand", label: "Brand Messages", icon: Briefcase, type: "brand" },
  { href: "/portal/submissions?type=creator", label: "Creator Messages", icon: UserSquare, type: "creator" },
];

export function AdminNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentType = searchParams.get('type');

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === '/portal/submissions' && currentType === item.type}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function AdminFooterNav() {
  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Back to Site">
            <Link href="/">
              <Home />
              <span>Back to Site</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <form action={logout} className="p-2">
          <Button variant="ghost" className="w-full justify-start gap-2 p-2 h-8">
            <LogOut className="size-4" />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
      </form>
    </>
  );
}

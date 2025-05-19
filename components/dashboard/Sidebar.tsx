"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DASHBOARD_MENU_ITEMS } from "@/constants/dashboard";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-12 h-[calc(100vh-3rem)] w-64 border-r border-gray-800 bg-gray-950 p-4">
      {" "}
      <div className="px-2 mb-5 py-3">
        <div className="flex flex-col items-start-safe">
          <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Analytics
          </h2>
          <p className="text-md text-gray-400">Business Intelligence</p>
        </div>
      </div>
      <nav className="space-y-2">
        {DASHBOARD_MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-colors hover:text-white",
                isActive ? "bg-gray-800 text-white" : "hover:bg-gray-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

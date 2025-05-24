import {
  BarChart3,
  Users,
  TrendingUp,
  Settings,
  HelpCircle,
  PieChart,
  Activity,
  CreditCard,
  LayersIcon,
  InboxIcon,
} from "lucide-react";

export type MenuItem = {
  title: string;
  icon: any; // Using any for Lucide icons type
  href: string;
};

export const DASHBOARD_MENU_ITEMS: MenuItem[] = [
  {
    title: "Overview",
    icon: PieChart,
    href: "/dashboard",
  },
  {
    title: "Services",
    icon: LayersIcon,
    href: "/dashboard/services",
  },
  {
    title: "Requests",
    icon: InboxIcon,
    href: "/dashboard/requests",
  },
  {
    title: "Revenue Analytics",
    icon: BarChart3,
    href: "/dashboard/revenue",
  },
  {
    title: "Customer Insights",
    icon: Users,
    href: "/dashboard/customers",
  },
  {
    title: "Growth Metrics",
    icon: TrendingUp,
    href: "/dashboard/growth",
  },
  {
    title: "Transactions",
    icon: CreditCard,
    href: "/dashboard/transactions",
  },
  {
    title: "Performance",
    icon: Activity,
    href: "/dashboard/performance",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    title: "Help & Support",
    icon: HelpCircle,
    href: "/dashboard/support",
  },
];

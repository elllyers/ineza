import { Sidebar } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden pt-12">
      <Sidebar />
      <main className="flex-1 overflow-y-auto pl-64 scrollbar-hide">
        {children}
      </main>
    </div>
  );
}

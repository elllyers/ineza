import LayoutWrapper from "@/components/LayoutWrapper";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}

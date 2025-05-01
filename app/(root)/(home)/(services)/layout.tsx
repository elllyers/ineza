export default function Servicelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is a layout for the services page
  return <main className="h-screen max-w-screen bg-black">{children}</main>;
}
// This layout is used for the services page and its subpages
// It wraps the content of the services page and its subpages in a main tag

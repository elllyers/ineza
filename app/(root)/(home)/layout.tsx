import Navbar from "@/components/Navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="antialiased">
      <header className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </header>
      {children}
    </main>
  );
}

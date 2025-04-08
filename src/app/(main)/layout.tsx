// app/(main)/layout.tsx
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
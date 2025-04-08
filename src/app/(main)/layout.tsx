// app/(main)/layout.tsx
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  if (user) {
    try {
      // Gunakan upsert untuk menangani create atau update
      await prisma.user.upsert({
        where: { id: user.id },
        update: {}, // Tidak perlu update jika sudah ada
        create: {
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || null,
        },
      });
    } catch (error) {
      console.error("Failed to sync user:", error);
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
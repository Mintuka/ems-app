import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import QueryWrapper from "@/components/hooks/QueryWrapper";
import { Toaster } from "@/components/layout/Toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `${process.env.TITLE}`,
  description: "Employee Management System for ACME Industries Ltd",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <QueryWrapper>
          <body className={`${inter.className} min-h-screen flex flex-col  `}>
            {children}
            <footer className="footer footer-center p-4 bg-base-100 text-base-content">
              <div>
              </div>
            </footer>
            <Toaster />
          </body>
        </QueryWrapper>
      </html>
    </ClerkProvider>
  );
}

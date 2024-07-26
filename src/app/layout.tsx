import { Inter } from "next/font/google";
import "./globals.css";

import { Navbar } from "./_components/navbar";
import Footer from "./_components/footer";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-slate-100 ${inter.className}`}>
        <main className="min-h-[95vh] flex flex-col justify-center items-center">
          {children}
        </main>
      </body>
    </html>
  );
}

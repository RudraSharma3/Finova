import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google"; // Use Inter Tight for a sharper look
import "./globals.css";

const interTight = Inter_Tight({ 
  subsets: ["latin"],
  weight: ['400', '600', '800'] 
});

export const metadata: Metadata = {
  title: "Vaultic | Decision Intelligence Engine",
  description: "Secure your financial DNA. Outrun your trajectory.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${interTight.className} bg-vaultic-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
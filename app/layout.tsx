import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ConditionalNavigation from "@/components/ConditionalNavigation";
import { CartProvider } from "@/contexts/CartContext";

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ShotPay",
  description: "ShotPay - Your trusted platform for firearms and ammunition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <CartProvider>
          <ConditionalNavigation>
            {children}
          </ConditionalNavigation>
        </CartProvider>
      </body>
    </html>
  );
}

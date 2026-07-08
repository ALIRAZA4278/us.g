import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TrainingWatermark from "./components/TrainingWatermark";
import GovBanner from "./components/GovBanner";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import { getPayment } from "@/lib/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const payment = await getPayment();
  return { title: `${payment.service} - ${payment.charges}` };
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TrainingWatermark />
        <GovBanner />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "BlogVista",
    template: "%s | BlogVista",
  },
  description: "Read the Unseen, Explore the Unknown. Write Your Thoughts, Unveil the Undiscovered.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#0c0c0e",
              color: "#fff",
              borderRadius: "14px",
              fontSize: "14px",
              padding: "10px 14px",
            },
            success: { iconTheme: { primary: "#34d399", secondary: "#0c0c0e" } },
            error: { iconTheme: { primary: "#ff7a4d", secondary: "#0c0c0e" } },
          }}
        />
        {children}
      </body>
    </html>
  );
}

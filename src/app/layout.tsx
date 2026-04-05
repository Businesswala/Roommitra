import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { SocketProvider } from "@/components/providers/SocketProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roommitra | India's #1 Hyperlocal Living Hub (roommitra.in)",
  description: "Find your perfect space. Experience better living at Roommitra.in. Search verified Rooms, PGs, Tiffin services, and Laundry near you entirely across India.",
  openGraph: {
    title: 'Roommitra Hyperlocal Marketplace',
    description: 'Find premium PGs, Rooms, Tiffins, and Laundry strictly at Roommitra.in',
    url: 'https://roommitra.in',
    siteName: 'Roommitra',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SocketProvider>
            {children}
            <Toaster position="top-center" richColors />
          </SocketProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

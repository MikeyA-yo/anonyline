import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    template:"%s | Anonyline",
    default:"Anonyline",
  },
  description: "Anonyline is a very simple anonymous chat application",
  keywords: ["anonymous chat", "anonymous messaging", "chat app", "anonymous forum", "free chat web app", "anonyline", "anonymous talks"],
  openGraph: {
    title: "Anonyline - Anonymous Chat Application",
    description: "Anonyline is a platform for anonymous chatting and sharing thoughts",
    url: "https://anonyline.vercel.app",
    siteName: "Anonyline",
    images: [
      {
        url: "https://anonyline.vercel.app/anonymous-1.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anonyline - Anonymous Chat Application",
    description: "Anonyline is a platform for anonymous chatting and sharing thoughts",
    images: ["https://anonyline.vercel.app/anonymous-1.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import LoginProvider from "@/components/context-providers/login";

export const metadata: Metadata = {
  title: "Thought Cloud",
  description: "Write and share your note",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body>
        <LoginProvider>
          {children}
        </LoginProvider>
      </body>
    </html>
  );
}

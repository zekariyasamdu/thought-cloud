import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/context-providers/auth-provider";

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
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

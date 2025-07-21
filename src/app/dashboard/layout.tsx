"use client"
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/composite/app-sidebar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";



export default function SideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const authInfo = useAuth();
  const router = useRouter();
    useEffect(() => {
    if (!authInfo?.user) {
      router.push('/login');
    }
  }, [authInfo?.user, router]);
  


  return (
        <SidebarProvider>
          <AppSidebar />
          <main>
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
  );
}

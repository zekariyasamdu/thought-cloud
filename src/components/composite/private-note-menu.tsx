import React, { useState } from "react";
import { SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import useFetchPrivateData from "@/hooks/use-fetch-private-note";
import { Skeleton } from "../ui/skeleton";

export default function PrivateNoteMenu() {
  const [isLoading, setIsLoading] = useState(true);
  const [privateNotes] = useFetchPrivateData(setIsLoading);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 9 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton asChild>
              <Skeleton className="h-5 w-full rounded-full bg-gray-300" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </>
    );
  }
  return privateNotes?.map((item) => (
    <SidebarMenuItem key={item.id}>
      <SidebarMenuButton asChild>
        <a href={`/dashboard/${item.id}`}>
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ));
}

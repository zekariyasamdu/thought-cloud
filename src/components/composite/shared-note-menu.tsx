import React, { useState } from 'react'
import { SidebarMenuItem, SidebarMenuButton } from '../ui/sidebar'
import { Skeleton } from '../ui/skeleton';
import useFetchSharedData from '@/hooks/use-fetch-shared-notes';

export default function SharedNoteMenu() {


    const [isLoading, setIsLoading] = useState(true)
    const [sharedNotes] = useFetchSharedData(setIsLoading);

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
        )

    }
    return (
        <>
        {sharedNotes?.map((item) => (

            <SidebarMenuItem key={item.id}>
                <SidebarMenuButton asChild>
                    <a href={`/dashboard/${item.id}`}>
                        <span>{item.title}</span>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>

            ))}
        </>

    )


}


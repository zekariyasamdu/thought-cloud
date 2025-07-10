import { getCurrentUserIdAsync, getCurrentSharedCollection } from "@/lib/utils";
import { INote } from "@/types/notes";
import { getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function useFetchSharedData(){
    const [shareNotes, setShareNotes] = useState<INote[]>();
    useEffect(() => {
        async function getNotes() {
            try {
                const id = await getCurrentUserIdAsync();
                const SharedCollection = getCurrentSharedCollection(id)
                const rawSharedData = await getDocs(SharedCollection)
                const sharedData: INote[] = rawSharedData.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as INote[]
            setShareNotes(sharedData)
            }
            catch(e){
                console.error(e)
            }
        }
        getNotes();
    }, [setShareNotes])
    return [shareNotes];
}
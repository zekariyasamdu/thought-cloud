import { getCurrentUserIdAsync, getCurrentPrivateCollection} from "@/lib/utils";
import { INote } from "@/types/notes";
import { getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function useFetchPrivateData(){
    const [privateNotes, setPrivateNotes] = useState<INote[]>();
    useEffect(() => {
        async function getNotes() {
            try {
                const id = await getCurrentUserIdAsync();
                const privateCollection = getCurrentPrivateCollection(id)
                const rawPrivateData = await getDocs(privateCollection)
                const privateData: INote[] = rawPrivateData.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as INote[]
                setPrivateNotes(privateData)
            }
            catch(e){
                console.error(e)
            }
        }
        getNotes();
    }, [setPrivateNotes])
    return [privateNotes];
}
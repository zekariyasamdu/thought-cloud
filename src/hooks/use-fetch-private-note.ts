import { getCurrentPrivateCollection } from "@/lib/db";
import { getCurrentUserIdAsync } from "@/lib/utils/firebase";
import { INote } from "@/types/notes";
import { getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function useFetchPrivateData(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [privateNotes, setPrivateNotes] = useState<INote[]>();
  useEffect(() => {
    async function getNotes() {
      try {
        const id = await getCurrentUserIdAsync();
        const privateCollection = getCurrentPrivateCollection(id);
        const rawPrivateData = await getDocs(privateCollection);
        const privateData: INote[] = rawPrivateData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as INote[];
        setPrivateNotes(privateData);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    }
    getNotes();
  }, [setPrivateNotes, setIsLoading]);
  return [privateNotes];
}

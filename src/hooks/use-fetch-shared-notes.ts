import { getCurrentSharedCollection } from "@/lib/db";
import { getCurrentUserIdAsync } from "@/lib/utils/firebase";
import { INote } from "@/types/notes";
import { getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function useFetchSharedData(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [shareNotes, setShareNotes] = useState<INote[]>();
  useEffect(() => {
    async function getNotes() {
      try {
        const id = await getCurrentUserIdAsync();
        const SharedCollection = getCurrentSharedCollection(id);
        const rawSharedData = await getDocs(SharedCollection);
        const sharedData: INote[] = rawSharedData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as INote[];
        setShareNotes(sharedData);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    }
    getNotes();
  }, [setShareNotes, setIsLoading]);
  return [shareNotes];
}

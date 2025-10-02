"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SquarePen } from "lucide-react";
import { SidebarMenuButton } from "../ui/sidebar";
import { PrivateSharedSwitch } from "./private-shared-switch";
import { useState } from "react";
import { addDoc } from "firebase/firestore";
import {
  getCurrentPrivateCollection,
  getCurrentSharedCollection,
} from "@/lib/db";
import { getCurrentUserId } from "@/lib/utils/firebase";

export function AddNotesDialog() {
  const [isPrivate, setIsPrivate] = useState(true);
  const [isShared, setIsShared] = useState(false);
  const [title, setTitle] = useState("Untitled");
  async function addNotes() {
    try {
      const collection = isPrivate
        ? getCurrentPrivateCollection?.()
        : getCurrentSharedCollection?.();
      console.log(getCurrentUserId());
      if (!collection) {
        throw new Error("Private collection is not available.");
      }
      await addDoc(collection, {
        id: new Date().getMilliseconds().toString(),
        time: new Date().toDateString(),
        title,
        content: "",
        public: isShared,
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton className="cursor-pointer">
          {" "}
          <SquarePen /> Add Note
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription>
            Click Add when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name-1">Title</Label>
            <Input
              id="name-1"
              name="name"
              defaultValue="Untitled"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label>Scope</Label>
            <PrivateSharedSwitch
              isPrivate={isPrivate}
              setPrivate={setIsPrivate}
              isShare={isShared}
              setShare={setIsShared}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={() => addNotes()}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

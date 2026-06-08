// Composant qui ouvre un Dialog de confirmation, et active une fonction passée en props

"use client";

import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";
import { Spinner } from "./spinner";

export default function ConfirmDialog({
  open,
  setOpen,
  action,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  action: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="z-150">
        <AlertDialogHeader>
          <AlertDialogTitle>Veuillez confirmer</AlertDialogTitle>
          <AlertDialogDescription>
            Ce choix est irréversible
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={() => startTransition(() => action())}>
            {isPending ? <Spinner /> : "Confirmer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

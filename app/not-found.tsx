//Composant NotFound pour gérer les erreurs 404
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Card className="h-fit w-100">
        <CardHeader>
          <CardTitle className="mx-auto">Oups, mauvaise direction</CardTitle>
          <CardDescription className="mx-auto">
            La page à laquelle vous souhaitez accéder n'existe pas
          </CardDescription>
        </CardHeader>
        <CardContent className="mx-auto">
          <Button
            onClick={() => router.replace("/")}
            className="hover:cursor-pointer"
          >
            Revenir en terrain connu
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

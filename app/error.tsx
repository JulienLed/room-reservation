//Composant error pour (main) et ses enfants

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

export default function Error() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Card className="h-fit w-100">
        <CardHeader>
          <CardTitle className="mx-auto">
            Oups, il semble qu'il y ait eu une erreur...
          </CardTitle>
          <CardDescription className="mx-auto">
            Une erreur est survenue, veuillez réessayer
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

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
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Oups, il semble qu'il y ait eu une erreur...</CardTitle>
          <CardDescription>
            Une erreur est survenue, veuillez réessayer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center w-[50%]">
            <Button onClick={() => router.back()}>
              Revenir en terrain connu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

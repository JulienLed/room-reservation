//Composant affichant les infos de la session

"use client";

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { User } from "lucide-react";

export default function InfoSession({ session }: { session: Session | null }) {
  console.log("Imag data:" + session?.user?.image);
  return (
    <section>
      {/* Si le session existe, on affiche les éléments de celle-ci, sinon on propose de se connecter */}
      {session ? (
        <div className="grid grid-cols-[20%_80%]">
          {session.user && session.user.image ? (
            <Image
              src={session.user?.image}
              alt="Image de l'utilisateur connecté"
              width={30}
              height={20}
            />
          ) : (
            <User />
          )}
          <Button onClick={() => signOut()}>Se déconnecter</Button>
          <Button className="col-start-2">Vos réservations</Button>
        </div>
      ) : (
        <Button>
          <Link href={"/sign-in"}>Se connecter</Link>
        </Button>
      )}
    </section>
  );
}

//Composant affichant les infos de la session

"use client";

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function InfoSession({ session }: { session: Session | null }) {
  return (
    <section>
      {/* Si le session existe, on affiche les éléments de celle-ci, sinon on propose de se connecter */}
      {session ? (
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-2">
          <div className="hidden md:flex">
            {session.user && session.user.image ? (
              <div>
                <Image
                  src={session.user?.image}
                  alt="Image de l'utilisateur connecté"
                  width={30}
                  height={20}
                  title={cn(session.user.name ? session.user.name : "")}
                />
              </div>
            ) : (
              <User />
            )}
          </div>
          <Button className="col-start-2">
            <Link href={"/reservations"}>Vos réservations</Link>
          </Button>
          <Button onClick={() => signOut()}>Se déconnecter</Button>
        </div>
      ) : (
        <Button>
          <Link href={"/sign-in"}>Se connecter</Link>
        </Button>
      )}
    </section>
  );
}

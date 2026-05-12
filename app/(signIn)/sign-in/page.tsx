//Page de connexion
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { signIn } from "@/lib/auth";

export default function Page() {
  return (
    <section
      id="connexion"
      className="flex-1 flex justify-center items-center w-full"
    >
      {/* Card avec les options de connections */}
      <Card className="min-w-md max-w-xl">
        <CardHeader>
          <CardTitle className="text-center">
            Se connecter / Créer un compte
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          {/* Bouton de connection Google */}
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/home" });
            }}
          >
            <button
              className="text-lg hover:cursor-pointer active:scale-95 duration-200"
              type="submit"
            >
              <Image
                src={"/google-logo.png"}
                alt="Logo SignIn Google"
                width={189}
                height={40}
                unoptimized
              />
            </button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}

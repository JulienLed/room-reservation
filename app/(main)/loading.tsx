//Composant loading pour (main) et ses enfants

import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-foreground/20">
      <Spinner className="size-20 text-foreground" />
    </div>
  );
}

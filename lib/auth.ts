//La config de Auth.js

import NextAuth from "next-auth";
// Il faut définir pourquoi ça donne une erreur
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [],
});

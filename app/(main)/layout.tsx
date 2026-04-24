//Ajout de Header.tsx dans le Layout
import Header from "@/components/layout/header/Header";
export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="w-full">
        <Header />
      </header>
      {children}
    </>
  );
}

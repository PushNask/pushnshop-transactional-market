import { MainNav } from "./NavigationMenu";
import { Footer } from "./Footer";
import { Container } from "@/components/ui/Container";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container>
          <div className="flex h-16 items-center">
            <MainNav />
          </div>
        </Container>
      </header>
      
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
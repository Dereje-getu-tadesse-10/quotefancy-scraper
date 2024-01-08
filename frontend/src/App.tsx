import { Hero } from "@/components/hero";
import { ScrapeWrapper } from "@/components/scrape-wrapper";
import { ThemeSwitch } from "@/components/theme-switch.tsx";
import { Header } from "./components/header";

function App() {
  return (
    <>
      <main className="container mx-auto">
        <Header />
        <Hero />
        <ScrapeWrapper />
      </main>
    </>
  );
}

export default App;

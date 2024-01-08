import { Hero } from "@/components/hero";
import { ScrapeWrapper } from "@/components/scrape-wrapper";
import { ThemeSwitch } from "./components/theme-switch";

function App() {
  return (
    <>
      <main className="container mx-auto">
        <Hero />
        <ScrapeWrapper />
      </main>
    </>
  );
}

export default App;

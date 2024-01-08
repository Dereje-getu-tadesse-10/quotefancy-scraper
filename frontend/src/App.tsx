import { Hero } from "@/components/hero";
import { ScrapeWrapper } from "@/components/scrape-wrapper";
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

import { ScraperForm } from "@/components/form";
import { DownloadUrls } from "@/components/download-urls";

export const ScrapeWrapper = () => (
  <section className="grid grid-cols-1 gap-4 md:grid-cols-6">
    <div className="md:col-span-4">
      <ScraperForm />
    </div>
    <div className="md:col-span-2">
      <DownloadUrls />
    </div>
  </section>
);

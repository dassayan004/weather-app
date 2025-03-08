import SearchForm from "@/components/SearchForm";
import Weather from "../components/weather";
import { ModeToggle } from "@/components/mode-toggle";
import { getBackgroundImage } from "@/lib/weatherBg";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { city } = await searchParams;

  const query = city || "London";

  const backgroundImage = await getBackgroundImage(query as string);
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-6"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 backdrop-blur-xs bg-black/20 dark:bg-black/40"></div>
      <div className="relative space-y-4">
        <div className="flex justify-between items-center gap-3">
          <h1 className="text-4xl font-bold">Weather App</h1>
          <ModeToggle />
        </div>
        <SearchForm />
        <Suspense
          fallback={
            <Skeleton className="h-[125px] w-full max-w-sm rounded-xl" />
          }
        >
          <Weather city={query as string} />
        </Suspense>
      </div>
    </div>
  );
}

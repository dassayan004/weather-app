import Link from "next/link";
import { getWeather } from "../lib/weaterReport";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiDaySunny,
  WiNightClear,
} from "react-icons/wi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WeatherProps {
  city: string;
}

export default async function Weather({ city }: WeatherProps) {
  const weather = await getWeather(city);

  if (!weather) {
    return (
      <p className="text-red-500 text-lg mt-4">
        No weather data found for {city}.{" "}
        <Link href="/" className="hover:underline">
          Try again
        </Link>
      </p>
    );
  }

  return (
    <>
      <Card className={cn("w-full max-w-sm", "border-none shadow-xl")}>
        <CardHeader className="flex-row justify-between items-center">
          <CardTitle className="text-lg">
            {weather.location.name}
            <br />
            <span className="text-xl font-bold">
              {weather.location.country}
            </span>
          </CardTitle>
          <CardDescription>{weather.location.localtime}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <img
              src={weather.current.condition.icon}
              alt="Weather icon"
              // className="w-16 h-16"
            />
            <p className="text-lg font-semibold ml-1">
              {weather.current.condition.text}
            </p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <WiThermometer className="text-red-500 text-3xl" />
              <p className="text-xl font-semibold ml-2">
                {weather.current.temp_c}°C
              </p>
            </div>
            <p className="text-muted-foreground text-sm">
              Feels like: {weather.current.feelslike_c}°C
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="flex items-center">
              <WiHumidity className="text-blue-500 text-3xl" />
              <p className="ml-2">{weather.current.humidity}% Humidity</p>
            </div>
            <div className="flex items-center">
              <WiStrongWind className="text-muted-foreground text-3xl" />
              <p className="ml-2">{weather.current.wind_kph} km/h Wind</p>
            </div>
            <div className="flex items-center">
              {weather.current.uv > 3 ? (
                <WiDaySunny className="text-yellow-500 text-3xl" />
              ) : (
                <WiNightClear className="text-muted-foreground text-3xl" />
              )}
              <p className="ml-2">UV Index: {weather.current.uv}</p>
            </div>
            <div className="flex items-center">
              <WiStrongWind className="text-indigo-500 text-3xl" />
              <p className="ml-2">{weather.current.vis_km} km Visibility</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

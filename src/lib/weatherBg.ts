export interface WeatherCity {
  page: number;
  per_page: number;
  photos: Photo[];
  total_results: number;
  next_page: string;
}

export interface Photo {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: Src;
  liked: boolean;
  alt: string;
}

export interface Src {
  original: string;
  large2x: string;
  large: string;
  medium: string;
  small: string;
  portrait: string;
  landscape: string;
  tiny: string;
}

export async function getBackgroundImage(city: string) {
  const pexelsKey = process.env.PEXELS_API_KEY!;
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${city}&per_page=1`,
    { headers: { Authorization: pexelsKey } }
  );

  if (!response.ok) return null;
  const data: WeatherCity = await response.json();
  return data.photos.length > 0 ? data.photos[0].src.original : "";
}

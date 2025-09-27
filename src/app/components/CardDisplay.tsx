"use client";

import { useEffect, useState } from "react";
import Card from "./Card";

type RawMediaItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  media_type?: "movie" | "tv";
  vote_average?: number;
  rating?: number;
};

type MediaItem = {
  id: number;
  title: string;
  poster_path: string | null;
  media_type: "movie" | "tv";
  rating: number;
};

interface CardDisplayProps {
  mediaType?: "movie" | "tv" | "both";
  limit?: number;
}

const CardDisplay = ({ mediaType = "both", limit = 16 }: CardDisplayProps) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/movies");
        const data = await res.json();

        const results = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : [];

        const normalized: MediaItem[] = results.map((item: RawMediaItem) => {
          const type: "movie" | "tv" =
            item.media_type || (item.title ? "movie" : "tv");

          console.log(`${item.id} → ${type === "movie" ? "Movie" : "Series"}`);

          return {
            id: item.id,
            title: item.title || item.name || "untitled",
            poster_path: item.poster_path,
            media_type: type,
            rating:
              item.vote_average != null
                ? parseFloat(item.vote_average.toFixed(1))
                : 0,
          };
        });

        let filtered: MediaItem[] = [];
        if (mediaType === "movie") {
          filtered = normalized
            .filter((i) => i.media_type === "movie")
            .slice(0, limit);
        } else if (mediaType === "tv") {
          filtered = normalized
            .filter((i) => i.media_type === "tv")
            .slice(0, limit);
        } else {
          //  Pick 3 movies & 3 tv shows
          const movies = normalized
            .filter((i) => i.media_type === "movie")
            .slice(0, Math.floor(limit / 2));
          const tvShows = normalized
            .filter((i) => i.media_type === "tv")
            .slice(0, Math.floor(limit / 2));

          filtered = [...movies, ...tvShows];
        }
        setItems(filtered);
      } catch (err) {
        console.error("Error fetching media:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mediaType, limit]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen py-10 px-6 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card
            key={`${item.media_type}-${item.id}`}
            id={item.id}
            title={item.title || ""}
            posterPath={
              item.poster_path
                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                : "/placeholder.jpg"
            }
            type={item.media_type}
            rating={item.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default CardDisplay;

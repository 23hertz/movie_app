"use client";

import { useEffect, useState } from "react";
import Card from "./Card";

type MediaItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  media_type?: "movie" | "tv";
};

const CardDisplay = () => {
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

        // 👇 Decide if each item is movie or series
        const normalized = results.map((item: any) => {
          // const type: "movie"|| (item.title ? "movie" : "tv");

          const type: "movie" | "tv" =
            item.media_type || (item.title ? "movie" : "tv");

          console.log(`${item.id} → ${type === "movie" ? "Movie" : "Series"}`);

          return {
            id: item.id,
            title: item.title || item.name,
            poster_path: item.poster_path,
            media_type: type,
          };
        });

        setItems(normalized);
      } catch (err) {
        console.error("Error fetching media:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          />
        ))}
      </div>
    </div>
  );
};

export default CardDisplay;

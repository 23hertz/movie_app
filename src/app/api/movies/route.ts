// import { NextResponse } from "next/server";
// import axios from "axios";

// type RawMediaItem = {
//   id: number;
//   title?: string;
//   name?: string;
//   poster_path: string | null;
//   overview?: string;
//   media_type?: "movie" | "tv";
// };

// // Normalized type for your API response
// type MediaItem = RawMediaItem & {
//   type: "movie" | "tv";
// };

// export async function GET() {
//   try {
//     const movieRes = await axios.get(
//       "https://api.themoviedb.org/3/discover/movie",
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
//           Accept: "application/json",
//         },
//         params: {
//           sort_by: "popularity.desc",
//           page: 1,
//         },
//       }
//     );

//     const tvRes = await axios.get("https://api.themoviedb.org/3/discover/tv", {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
//         Accept: "application/json",
//       },
//       params: {
//         sort_by: "popularity.desc",
//         page: 1,
//       },
//     });

//     // Combine movies + TV shows
//     const combined: MediaItem[] = [
//       ...movieRes.data.results.map((m) => ({ ...m, type: "movie" as const })),
//       ...tvRes.data.results.map((t) => ({ ...t, type: "tv" as const })),
//     ];

//     return NextResponse.json({ results: combined });
//   } catch (error: any) {
//     console.error("TMDB API error:", error.message);
//     return NextResponse.json(
//       { error: "Failed to fetch movies and series" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import axios from "axios";

// Raw TMDB item type (before normalization)
type RawMediaItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  overview?: string;
  media_type?: "movie" | "tv";
};

// Normalized type for your API response
type MediaItem = RawMediaItem & {
  type: "movie" | "tv";
};

export async function GET() {
  try {
    const movieRes = await axios.get<{ results: RawMediaItem[] }>(
      "https://api.themoviedb.org/3/discover/movie",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
          Accept: "application/json",
        },
        params: {
          sort_by: "popularity.desc",
          page: 1,
        },
      }
    );

    const tvRes = await axios.get<{ results: RawMediaItem[] }>(
      "https://api.themoviedb.org/3/discover/tv",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
          Accept: "application/json",
        },
        params: {
          sort_by: "popularity.desc",
          page: 1,
        },
      }
    );

    // Combine movies + TV shows with proper typing
    const combined: MediaItem[] = [
      ...movieRes.data.results.map((m) => ({ ...m, type: "movie" as const })),
      ...tvRes.data.results.map((t) => ({ ...t, type: "tv" as const })),
    ];

    return NextResponse.json({ results: combined });
  } catch (err) {
    const error = err as Error;
    console.error("TMDB API error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch movies and series" },
      { status: 500 }
    );
  }
}

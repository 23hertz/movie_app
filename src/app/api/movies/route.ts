// // // import { NextResponse } from "next/server";
// // // // import api from "@/app/api/movies/route"

// // import { NextResponse } from "next/server";
// // import axios from "axios";

// // export async function GET() {
// //   try {
// //     const res = await api.get("/discover/movie");
// //     return NextResponse.json(res.data);
// //   } catch (error) {
// //     return NextResponse.json(
// //       { error: "Failed to fetch movies" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // import { NextResponse } from "next/server";
// // import axios from "axios";

// // export async function GET() {
// //   try {
// //     const moviesReq = await axios.get(
// //       "https://api.themoviedb.org/3/discover/movie",
// //       {
// //         headers: {
// //           Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
// //           Accept: "application/json",
// //         },
// //       }
// //     );

// //     const seriesReq = await axios.get(
// //       "https://api.themoviedb.org/3/discover/tv",
// //       {
// //         headers: {
// //           Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
// //           Accept: "application/json",
// //         },
// //       }
// //     );

// //     const [moviesRes, seriesRes] = await Promise.all([moviesReq, seriesReq]);

// //     const movies = moviesRes.data.results.map((m: any)=> ({
// //       id: m.id,
// //       title: m.title,
// //       poster_path: m.poster_path,
// //       overview : m.overview,
// //       type:"movie",
// //     }))

// //      const series = seriesRes.data.results.map((s: any)=> ({
// //       id: s.id,
// //       title: s.title,
// //        poster_path: s.poster_path,
// //       overview = s.overview
// //       type:"tv",
// //      }))

// //     const combined = [...movies, ...series];

// //     return NextResponse.json(combined); //
// //   } catch (error: any) {
// //     console.error("TMDB API error:", error.message);
// //     return NextResponse.json(
// //       { error: "Failed to fetch movies" },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import axios from "axios";

// export async function GET() {
//   try {
//     // const [moviesRes, tvRes] = await Promise.all([
//     //   fetch("https://api.themoviedb.org/3/discover/movie", {
//     //     headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
//     //     Accept:"application/json"
//     //   }),
//     //   fetch("https://api.themoviedb.org/3/discover/tv", {
//     //     headers: { Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}` },
//     //   }),
//     // ]);

//     const moviesRes = await axios.get(
//       "https://api.themoviedb.org/3/discover/movie",headers:{
//       Accept: "application/json",
//     },
//       params: {
//         sort_by: "popularity.desc",
//         page:1,
// ``    });
//     const tv = await tvRes.json();

//     const merged = [
//       ...(movies.results || []).map((m: any) => ({ ...m, type: "movie" })),
//       ...(tv.results || []).map((t: any) => ({ ...t, type: "tv" })),
//     ];

//     return NextResponse.json(merged);
//   } catch (error: any) {
//     console.error("TMDB API error:", error.message);
//     return NextResponse.json(
//       { error: "Failed to fetch movies" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const movieRes = await axios.get(
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

    const tvRes = await axios.get("https://api.themoviedb.org/3/discover/tv", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
        Accept: "application/json",
      },
      params: {
        sort_by: "popularity.desc",
        page: 1,
      },
    });

    // Combine movies + TV shows
    const combined = [
      ...movieRes.data.results.map((m: any) => ({ ...m, type: "movie" })),
      ...tvRes.data.results.map((t: any) => ({ ...t, type: "tv" })),
    ];

    return NextResponse.json({ results: combined });
  } catch (error: any) {
    console.error("TMDB API error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch movies and series" },
      { status: 500 }
    );
  }
}

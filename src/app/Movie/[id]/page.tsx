// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faStar } from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";
// import Header from "@/app/components/Header";

// type MovieDetails = {
//   id: number;
//   title: string;
//   overview: string;
//   release_date: string;
//   genres: { id: number; name: string }[];
//   poster_path: string | null;
//   backdrop_path: string | null;
//   vote_average: number;
//   runtime?: number;
//   tagline?: string;
// };

// const MoviePage = ({ params }: { params: { id: string } }) => {
//   const [details, setDetails] = useState<MovieDetails | null>(null);

//   // Get ID from the URL path
//   // const params = useParams();
//   // const id = params?.id as string;

//   // Get type (movie | tv) from query string
//   // const searchParams = useSearchParams();
//   // const mediaType = searchParams.get("type") || "movie"; // default → movie

//   // const [details, setDetails] = useState<any>(null);

//   // useEffect(() => {
//   //   const fetchMovie = async () => {
//   //     try {
//   //       // console.log(`Fetching details for ID: ${id}, Type: ${mediaType}`);

//   //       const res = await fetch(
//   //         `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`,
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
//   //             accept: "application/json",
//   //           },
//   //         }
//   //       );

//   //       if (!res.ok) {
//   //         throw new Error("Failed to fetch details");
//   //       }

//   //       const data: MovieDetails = await res.json();
//   //       setDetails(data);
//   //     } catch (err) {
//   //       console.error("Error fetching details:", err);
//   //     }
//   //   };

//   //   if (id) fetchDetails();
//   // }, [id, mediaType]);

//   // if (!details) {
//   //   return <p className="text-white">Loading...</p>;
//   // }

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const res = await fetch(`/api/movies/${params.id}`);
//         const data: MovieDetails = await res.json();
//         setDetails(data);
//       } catch (err) {
//         console.error("Error fetching movie:", err);
//       }
//     };

//     fetchMovie();
//   }, [params.id]);

//   if (!details) return <p>Loading...</p>;
//   return (
//     <div className="bg-gray-900 max-w-[1440px] mx-auto h-auto px-[4rem]">
//       <Header />

//       {/* Hero Section */}
//       <div className="mt-7 relative">
//         <Image
//           src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
//           alt="details"
//           width={1400}
//           height={480}
//           className="w-[1400px] h-[480px] mx-auto rounded-[40px] object-cover mt-5"
//         />
//         <div className="absolute top-100 left-20 w-[528px] h-[200px] bg-[#20283e] p-[40px] rounded-[24px] ">
//           <div className="flex flex-row">
//             <h5 className="font-sm font-[12px] font-[400] text-[#beb7fb] leading-[16px]">
//               MaileHeroko /
//             </h5>

//             <h5 className="font-sm font-[12px] font-[400] text-[#beb7fb] leading-[16px] ml-2">
//               {mediaType}
//             </h5>
//           </div>
//           <h3 className="text-[32px] font-[600] text-[#ebeef5] leading-[40px] mt-4">
//             {details.title || details.name}
//           </h3>
//         </div>
//       </div>

//       {/* Info Section */}
//       <div className="mt-46 flex justify-between gap-16 px-20">
//         <Image
//           src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
//           alt={details.title || details.name}
//           className="w-[480px] h-[720px] rounded-[24px]"
//           width={480}
//           height={720}
//         />

//         <div className="text-gray-300 w-[480px] h-[688px]">
//           <h4 className="font-[700] font-[24px] leading-[32px] text-[#ebeef5]">
//             Movie Details
//           </h4>
//           <p className="font-[400] font-[20px] leading-[32px] text-[#8e95a9]">
//             {details.overview}
//           </p>
//           <p className="bg-[#000000] w-[62px]  h-[32px] text-[#ffad49] flex flex row gap-1 text-[16px] rounded-[8px] px-4 py-2 text-center leading-4 mt-4">
//             <FontAwesomeIcon className="w-[16px] h-[16px]" icon={faStar} />
//             <span className="">{details.vote_average}</span>
//           </p>

//           <p className="mt-2 flex flex-col gap-2">
//             <span className="font-[400] font-[16px] leading-[24px] text-[#767e94]">
//               Type
//             </span>
//             <span className="font-[400] font-[20px] leading-[32px] text-[#c3d8c4]">
//               {mediaType === "movie" ? "Movie 🎬" : "Series 📺"}
//             </span>
//           </p>

//           <p className="mt-2 flex flex-col gap-2">
//             <span className="font-[400] font-[16px] leading-[24px] text-[#767e94]">
//               Release Date
//             </span>
//             <span className="font-[400] font-[20px] leading-[32px] text-[#c3d8c4]">
//               Release Date: {details.release_date || details.first_air_date}
//             </span>
//           </p>

//           <p className="mt-2 flex flex-col gap-2">
//             <span className="font-[400] font-[16px] leading-[24px] text-[#767e94]">
//               Run Time
//             </span>
//             <span className="font-[400] font-[20px] leading-[32px] text-[#c3d8c4]">
//               Release Date: {details.release_date || details.first_air_date}
//             </span>
//           </p>

//           <p className="mt-2 flex flex-col gap-2">
//             <span className="font-[400] font-[16px] leading-[24px] text-[#767e94]">
//               Genre
//             </span>
//             <span className="font-[400] font-[20px] leading-[32px] text-[#c3d8c4]">
//               {details?.genres?.length > 0
//                 ? details.genres
//                     .map((g: { id: number; name: string }) => g.name)
//                     .join(", ")
//                 : "N/A"}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MoviePage;

import Header from "@/app/components/Header";
import Image from "next/image";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Genre = {
  id: number;
  name: string;
};

type MovieDetails = {
  id: number;
  title?: string;
  media_type: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  vote_count?: BigInteger;
  genres: Genre[];
  runtime?: number;
  episode_run_time?: number[];
};

type PageProps = {
  params: {
    id: string;
    type: string;
  };
  searchParams: {
    type?: "movie" | "tv";
  };
};

export default async function MovieDetailsPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = params;
  const type = searchParams.type || "movie";

  // const endpoint = type === "series" ? "series" : "movie";

  const res = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data: MovieDetails = await res.json();

  let runtimeText = "";
  if (type === "movie" && data.runtime) {
    runtimeText = `${data.runtime} min`;
  } else if (type === "tv") {
    if (data.episode_run_time && data.episode_run_time.length > 0) {
      runtimeText = `${data.episode_run_time[0]} min per episode`;
    } else {
      runtimeText = "Runtime info not available";
    }
  }

  return (
    // <div className="min-h-screen py-10 px-6 flex flex-col md:flex-row gap-10">
    <div className="min-h-screen bg-[#121829]">
      <Header />
      {/* Poster */}
      <div className="relative">
        {data.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
            alt={data.title || data.name || "Poster"}
            width={1200}
            height={480}
            className="rounded-lg shadow-lg w-[1200px] h-[480px] my-12 mx-auto"
          />
        ) : (
          <div className="w-[300px] h-[450px] bg-gray-700 rounded-lg flex items-center justify-center">
            <span>No Image</span>
          </div>
        )}
        {/* <div className="w-[560px] h-[144px] bg-[#20283e]/80 rounded-[24px] p-[40px] absolute top-100 left-36"> */}
        <div className="absolute top-[100%] left-96 -translate-x-1/2 -translate-y-1/2 bg-[#20283e]/80 rounded-[24px] p-[24px] h-[144px] w-[560px] text-left">
          <div className="flex flex-row">
            <h4 className="text-[#ebeef9]/50 text-sm font-[12px] font-[400] leading-[16px] mr-2">
              MaileHeroko <span className="text-[#beb7fb]">/</span>
            </h4>

            <h4 className="text-[#beb7fb] text-sm font-[12px] font-[400] leading-[16px] ">
              {type}
            </h4>
          </div>
          <h3 className="tracking-[-2%] text-[32px] font-[600]  text-[#ebeef5]">
            {data.title || data.name}
          </h3>
        </div>
      </div>

      {/* Details */}
      <div className="mt-32 px-26 flex flex-row gap-10 ">
        <div className="w-[720px] h-[480px]">
          {data.backdrop_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w1280${data.poster_path}`}
              alt={data.title || data.name || "Poster"}
              width={720}
              height={480}
              className="rounded-lg shadow-lg w-[720px] h-[480px]  mx-auto rounded-[24px]"
            />
          ) : (
            <div className="w-[300px] h-[450px] bg-gray-700 rounded-lg flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
        </div>
        <div className="w-[480px] h-[688px]">
          <h4 className="text-[24px] mb-4 text-[#ebeeff] font-[700] leading-[32px] tracking-[-1.5%]">
            {data.title || data.name}
          </h4>

          {data.overview && (
            <p className="text-[20px] mb-4 text-[#ffffff] font-[400] leading-[32px] tracking-[-1.5%]">
              {data.overview}
            </p>
          )}

          {data.vote_count && (
            <span className="flex flex-row gap-2 mt-6">
              <FontAwesomeIcon
                icon={faStar}
                className="text-[#ffad49] w-[16px] h-[16px] mt-1"
              />
              <p className="text-regular font-[400] text-[16px] leading-[24px] text-[#ffad49]">
                {data.vote_count}
              </p>
            </span>
          )}

          <div className="flex flex-col mt-6 ">
            <span className="text-[16px] font-[400] leading-[24px] text-[#767e94]">
              Type
            </span>
            <p className="text-[20px] font-[400] leading-[32px] text-[#c3c8c4]">
              {type}
            </p>
          </div>

          <div className="flex flex-col mt-6 ">
            <span className="text-[16px] font-[400] leading-[24px] text-[#767e94]">
              Release Date
            </span>

            {data.release_date && (
              <p className="text-[20px] mb-4 text-[#ebeeff] font-[400] leading-[32px]">
                Release Date: {data.release_date}
              </p>
            )}
          </div>

          <div className="flex flex-col mt-6 ">
            <span className="text-[16px] font-[400] leading-[24px] text-[#767e94]">
              Run time
            </span>

            {data.release_date && (
              <p className="text-[20px] mb-4 text-[#ebeeff] font-[400] leading-[32px]">
                {runtimeText}
              </p>
            )}
          </div>

          <div className="flex flex-col mt-6 ">
            <span className="text-[16px] font-[400] leading-[24px] text-[#767e94]">
              Genres
            </span>

            {data.genres.length > 0 && (
              <p className="text-gray-400 mb-4">
                {data.genres.map((g) => g.name).join(", ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

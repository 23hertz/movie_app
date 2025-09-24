"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Header from "@/app/components/Header";

const MovieDetails = () => {
  // Get ID from the URL path
  const params = useParams();
  const id = params?.id as string;

  // Get type (movie | tv) from query string
  const searchParams = useSearchParams();
  const mediaType = searchParams.get("type") || "movie"; // default → movie

  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        console.log(`Fetching details for ID: ${id}, Type: ${mediaType}`);

        const res = await fetch(
          `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
              accept: "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch details");
        }

        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Error fetching details:", err);
      }
    };

    if (id) fetchDetails();
  }, [id, mediaType]);

  if (!details) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="bg-gray-900 max-w-[1440px] mx-auto h-auto px-[4rem]">
      <Header />

      {/* Hero Section */}
      <div className="mt-7 relative">
        <img
          src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
          alt="details"
          className="w-[1400px] h-[480px] mx-auto rounded-[40px] object-cover mt-5"
        />
        <div className="absolute top-100 left-20 w-[528px] h-[200px] bg-[#20283e] p-[40px] rounded-[24px] ">
          <div className="flex flex-row">
            <h5 className="font-sm font-[12px] font-[400] text-[#beb7fb] leading-[16px]">
              MaileHeroko /
            </h5>

            <h5 className="font-sm font-[12px] font-[400] text-[#beb7fb] leading-[16px] ml-2">
              {mediaType}
            </h5>
          </div>
          <h3 className="text-[32px] font-[600] text-[#ebeef5] leading-[40px] mt-4">
            {details.title || details.name}
          </h3>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-46 flex justify-between gap-16 px-20">
        <img
          src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
          alt={details.title || details.name}
          className="w-[480px] h-[720px] rounded-[24px]"
        />

        <div className="text-gray-300 w-[480px] h-[688px]">
          <h4 className="font-[700] font-[24px] leading-[32px] text-[#ebeef5]">
            Movie Details
          </h4>
          <p className="font-[400] font-[20px] leading-[32px] text-[#8e95a9]">
            {details.overview}
          </p>
          <p className="bg-[#000000] w-[62px]  h-[32px] text-[#ffad49] flex flex row gap-1 text-[16px] rounded-[8px] px-4 py-2 text-center leading-4 mt-4">
            <FontAwesomeIcon className="w-[16px] h-[16px]" icon={faStar} />
            <span className="">{details.vote_average}</span>
          </p>

          <p className="mt-2 flex flex-col gap-2">
            <span className="font-[400] font-[16px] leading-[24px] text-[#767e94]">
              Type
            </span>
            <span className="font-[400] font-[20px] leading-[32px] text-[#c3d8c4]">
              {mediaType === "movie" ? "Movie 🎬" : "Series 📺"}
            </span>
          </p>

          <p className="mt-2 flex flex-col gap-2">
            <span className="font-[400] font-[16px] leading-[24px] text-[#767e94]">
              Release Date
            </span>
            <span className="font-[400] font-[20px] leading-[32px] text-[#c3d8c4]">
              Release Date: {details.release_date || details.first_air_date}
            </span>
          </p>

          <p className="mt-2 flex flex-col gap-2">
            <span className="font-[400] font-[16px] leading-[24px] text-[#767e94]">
              Run Time
            </span>
            <span className="font-[400] font-[20px] leading-[32px] text-[#c3d8c4]">
              Release Date: {details.release_date || details.first_air_date}
            </span>
          </p>

          <p className="mt-2 flex flex-col gap-2">
            <span className="font-[400] font-[16px] leading-[24px] text-[#767e94]">
              Genre
            </span>
            <span className="font-[400] font-[20px] leading-[32px] text-[#c3d8c4]">
              {details?.genres?.length > 0
                ? details.genres.map((g: any) => g.name).join(", ")
                : "N/A"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

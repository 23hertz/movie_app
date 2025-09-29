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

  const res = await fetch(
    `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
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
            className="rounded-lg shadow-lg w-[1200px] h-[480px] my-12 mx-auto object-fit object-center"
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
              className="rounded-lg shadow-lg w-[720px] h-[480px]  mx-auto rounded-[24px] object-fit object-center"
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

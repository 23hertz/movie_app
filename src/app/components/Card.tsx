import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from "react-icons/fa";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type CardProps = {
  id: number;
  title: string;
  posterPath: string;
  type: "movie" | "tv";
  rating: number;
};

export default function Card({
  id,
  title,
  posterPath,
  type,
  rating,
}: CardProps) {
  const handleClick = () => {
    if (type === "movie") {
      console.log(`${title} → Movie`);
    } else {
      console.log(`${title} → Series`);
    }
  };

  return (
    <Link href={`/Movie/${id}?type=${type}`}>
      <div
        onClick={handleClick} //
        className="bg-[#20283e] rounded-lg overflow-hidden shadow-md cursor-pointer relative trasition-transform hover:scale-105"
      >
        <span className="absolute top-[1.38px] left-[1.38px]  text-[#ffad49] bg-[#000]/60 font-semibold flex flex-row gap-1 item-center align-center justify-center  rounded-[8px] h-[40px] w-[60px]">
          <FontAwesomeIcon
            icon={faStar}
            className="mt-3 w-[13.33px] h-[13.33px]"
          />
          <h4 className="mt-2 text-sm sm:text-base">{rating}</h4>
        </span>
        <Image
          src={posterPath}
          alt={title}
          width={500}
          height={80}
          className="w-full h-80 object-cover object-center"
        />
        <div className="p-4">
          <h3 className="text-white text-lg text-sm sm:text-base md:text-lgfont-bold">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

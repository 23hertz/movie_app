import Link from "next/link";
import Image from "next/image";

type CardProps = {
  id: number;
  title: string;
  posterPath: string;
  type: "movie" | "tv";
};

export default function Card({ id, title, posterPath, type }: CardProps) {
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
        className="bg-[#20283e] rounded-lg overflow-hidden shadow-md cursor-pointer"
      >
        <Image
          src={posterPath}
          alt={title}
          width={500}
          height={80}
          className="w-full h-80 object-cover"
        />
        <div className="p-4">
          <h3 className="text-white text-lg font-bold">{title}</h3>
        </div>
      </div>
    </Link>
  );
}

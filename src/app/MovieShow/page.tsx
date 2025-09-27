import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchMovie from "../components/SearchMovie";
import CardDisplay from "../components/CardDisplay";

const MovieShow = () => {
  return (
    <div className="bg-[#121829] m-w-[1440px] mx-auto h-[auto] leading[16px] px-[4rem]">
      <Header />
      <Hero />
      <SearchMovie />
      <CardDisplay mediaType="movie" limit={8} />
    </div>
  );
};

export default MovieShow;

import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchMovie from "../components/SearchMovie";
import CardDisplay from "../components/CardDisplay";

const TvShow = () => {
  return (
    <div className="bg-[#121829] m-w-[1440px] mx-auto h-[auto] leading[16px] px-[4rem]">
      <Header />
      <Hero />
      <SearchMovie />
      <CardDisplay mediaType="tv" limit={8} />
    </div>
  );
};

export default TvShow;

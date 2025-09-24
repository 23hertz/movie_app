import Category from "./components/category";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchMovie from "./components/SearchMovie";
import CardDisplay from "./components/CardDisplay";

const Home = () => {
  return (
    <div className="bg-[#121829] m-w-[1440px] mx-auto h-[auto] leading[16px] px-[4rem]">
      <Header />
      <Hero />
      <SearchMovie />
      <Category />
      <CardDisplay />
    </div>
  );
};

export default Home;

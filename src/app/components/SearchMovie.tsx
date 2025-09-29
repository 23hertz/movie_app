const SearchMovie = () => {
  return (
    <div className="mt-18">
      <form action="w-full max-w-md">
        <input
          type="text"
          name=""
          value="Search movies or Tv Shows"
          id=""
          className="font-poppins font-semibold text-[14px] sm:text-sm md:text-base leading-[16px] w-full max-w-[344px] h-[64] mt-10 border  rounded-[12px] py-[12px] px-[16px] text-[#475069] border-gray-700 hover:border-gray-700 bg-[#323b54] tracking-none placeholder:text-gray-400 hover:border-gray-400 focus:outline-none focus:border-[#7b6ef6]"
        />
      </form>
    </div>
  );
};

export default SearchMovie;

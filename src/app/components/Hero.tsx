const Hero = () => {
  return (
    <div className="mt-20 w-full max-w-[588px] px-4 h-[144px]">
      <h1 className="font-semibold text-[44px] lg:text-[64px] md-text-6xl text-[#ebeef5] leading-[80px] sm:leading-tight md:leading-80px tracking-[-2%]">
        MaileHereko
      </h1>
      <p className="font-poppins font-normal text-[#ffffff] leading-[24px] sm:text-sm md:text-base mt-6 text-[16px] tracking-none">
        List of movies and TV Shows, I,{" "}
        <span className="text-[#7b6ef6]">Pramod Poudel</span> have watched till
        date. Explore what I have watched and also feel free to make a
        suggestion. 😉
      </p>
    </div>
  );
};
export default Hero;

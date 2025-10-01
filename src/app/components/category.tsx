"use client";
import Link from "next/link";
import { useState } from "react";
import MovieShow from "../MovieShow/page";
import TvShow from "../TvShow/page";

const Category = () => {
  const [select, setSelect] = useState(0);
  return (
    <div className="w-full max-w-[400px] h-[56px] mt-16 bg-[#000000]/20 py-4 rounded-[12px]">
      <ul className="flex flex-row gap-1 justify-center ">
        <li className="md:px-2 lg-px-2">
          <a
            href="#"
            className="font-poppins font-semibold text-[12px] md:text-[14px] lg:text-[16px] tracking-[2%] leading-[24px] text-[#8e95a9] hover:bg-[#7b6ef6] hover:text-[#ebe9fe] py-[8px] px-[32px] rounded-[8px]"
          >
            All
          </a>
        </li>
        <li className="md:px-2 lg-px-2">
          <Link
            href="/MovieShow"
            className="font-poppins  font-semibold text-[12px] md:text-[14px] lg:text-[16px]  tracking-[2%] leading-[24px] text-[#8e95a9] hover:bg-[#7b6ef6] hover:text-[#ebe9fe] py-[8px] px-[32px] rounded-[8px]"
          >
            Movies
          </Link>
        </li>
        <li className="md:px-2 lg-px-2">
          <Link
            href="/TvShow"
            className="font-poppins font-semibold text-[12px] md:text-[14px] lg:text-[16px] tracking-[2%] leading-[24px] text-[#8e95a9] hover:bg-[#7b6ef6] hover:text-[#ebe9fe] py-[8px] px-[32px] rounded-[8px]"
          >
            TvShow
          </Link>
        </li>
      </ul>
      <div className="mt-10 flex flex-row gap-2">
        <h3 className="font-poppins font-[600] text-[32px] font-10px md:font-[14px] lg:font-[16px] leading-[40px] text-[#767e94] tracking-[-2%]">
          All
        </h3>
        <span className="font-poppins font-[400] mt-2 text-[12px] text-[#767e94] leading-[24px] tracking-[-2%]">
          (120)
        </span>
      </div>
    </div>
  );
};

export default Category;

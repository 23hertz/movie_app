import Image from "next/image";
import Logo from "@/app/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import {
  faArrowLeft,
  faArrowRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
const Header = () => {
  return (
    <div className="flex flex-row justify-between py-8 bg-[#121829]">
      <Link href="/" className="inline-block">
        <Image
          src="/images/logo.png"
          width={40}
          height={40}
          className="w-[40px] h-[40px] "
          alt="logo"
        />
      </Link>

      <ul className="flex flex-row ">
        <li className="px-8">
          <></>
          <a
            href="#"
            className="font-poppins font-semibold font-[16px] tracking-[2%] leading-[24px] text-[#a8aebf] tracking-[2%]"
          >
            Movies
          </a>
        </li>
        <li className="px-8">
          <a
            href="#"
            className="font-poppins font-semibold font-[16px] tracking-[2%] leading-[24px] text-[#a8aebf] tracking-[2%]"
          >
            Tv Shows
          </a>
        </li>
        <li className="px-8 ">
          <a
            href="#"
            className="font-poppins font-semibold font-[16px] tracking-[2%] leading-[24px] text-[#a8aebf] tracking-[2%]"
          >
            Suggest Me
            <FontAwesomeIcon
              icon={faArrowRight}
              className="ml-2 w-[16px] h-[16px]"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;

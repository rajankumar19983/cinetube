import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import ContentWrapper from "./ContentWrapper";

const listStyle =
  "transition-all ease-in duration-300 cursor-pointer text-[12px] md:text-[16px] hover:text-pink";

const iconStyle =
  "w-[50px] h-[50px] rounded-full bg-black_1 flex items-center justify-center cursor-pointer transition-all ease-in duration-300 hover:text-pink hover:shadow-[0_0_0.625em] hover:shadow-pink";

const Footer = () => {
  return (
    <footer className="bg-black_3 py-[50px] text-white relative">
      <ContentWrapper className="flex items-center flex-col">
        <ul className="list-none flex items-center justify-center gap-[15px] mb-[20px] md:mb-[30px] md:gap-[30px]">
          <li className={listStyle}>Terms & Conditions</li>
          <li className={listStyle}>Privacy-Policy</li>
          <li className={listStyle}>About</li>
          <li className={listStyle}>Blog</li>
          <li className={listStyle}>FAQ</li>
        </ul>
        <div className="text-[12px] leading-tight opacity-50 text-center max-w-[800px] mb-[20px] md:text-[14px] md:mb-[30px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          vestibulum leo et tincidunt consectetur. Nullam aliquam placerat eros,
          vitae faucibus diam eleifend eu. Fusce faucibus laoreet auctor.
          Quisque placerat tempus neque, sit amet euismod velit vestibulum eu.
          Vestibulum ultrices rhoncus porta. Nulla facilisi. Quisque convallis
          feugiat felis, eu facilisis sem. Morbi imperdiet pellentesque metus,
          et accumsan velit sagittis vel. Sed placerat semper tellus vel
          commodo.
        </div>
        <div className="flex items-center justify-center gap-[10px]">
          <span className={iconStyle}>
            <FaFacebook />
          </span>
          <span className={iconStyle}>
            <FaInstagram />
          </span>
          <span className={iconStyle}>
            <FaTwitter />
          </span>
          <span className={iconStyle}>
            <FaLinkedin />
          </span>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;

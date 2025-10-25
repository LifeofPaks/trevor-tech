import React from 'react'
import { GiImperialCrown } from "react-icons/gi";
import Logo from '../logo/Logo';


const Navbarr = () => {
  return (
    <nav className=" w-full flex justify-center mx-auto!">
      <div className="flex items-center justify-between text-gray-800 !px-12 !py-4 w-[1000px] fixed top-4 left-0 right-0 mx-auto! z-50 bg-white/50 backdrop-blur-md shadow-lg rounded-2xl">
        <Logo />
        <ul className="flex items-center gap-8 text-[14px] font-medium">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#testimonial">Testimonail</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbarr
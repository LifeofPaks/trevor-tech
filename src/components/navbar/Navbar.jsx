import React from 'react'
import { GiImperialCrown } from "react-icons/gi";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white px-12! py-6!">
      {/* <div>
        <GiImperialCrown className="mb-[-5px]! ml-[-2px]!" />

        <div className=" logo-font">TrevorTech</div>
      </div> */}
      <div className='flex items-center flex-col'>

        <div className=" logo-font text-[10px]">TrevorTech</div>
      </div>
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
          <a href="#contact">Contact Us</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar
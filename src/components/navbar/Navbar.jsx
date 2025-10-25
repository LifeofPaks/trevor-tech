import React from 'react'
import { GiImperialCrown } from "react-icons/gi";
import Logo from '../logo/Logo';


const Navbar = () => {
  return (
    <nav className="flex items-center justify-between  bg-gray-800 text-white px-12! py-4!">
 
     <Logo/>
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
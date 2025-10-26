import React from 'react'
import Logo1 from "../../assets/logo-1.png";
import Logo3 from "../../assets/logo-3.png";
import Logo4 from "../../assets/logo-4.png";
import { Link } from 'react-router-dom';

const DemoLogo = () => {
  return (
    <Link to="/" className="">
      <div className="flex items-center -mb-[10px]!">
        {/* <img src={Logo3} alt="logo-image" className="w-[40px]" />
         */}
        <h1 className="font-extrabold text-[2rem] text-white rotate-[12deg]">
          T
        </h1>
        <img
          src={Logo4}
          alt="logo-image"
          className="w-[21px] -ml-[8px]! rotate-[180deg] !mt-3"
          style={{ filter: "invert(1)" }}
        />
      </div>

      <div className=" logo-font text-[10px]">
        Trevor <span className="text-red-400 -ml-[3px]!">Tech</span>
      </div>
    </Link>
  );
}

export default DemoLogo
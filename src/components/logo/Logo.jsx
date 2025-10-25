import React from 'react'
import Logo1 from "../../assets/logo-1.png";
import Logo3 from "../../assets/logo-3.png";

const Logo = () => {
  return (
    <div className="flex items-center flex-col">
      <div className="flex items-center -mb-[5px]!">
        <img src={Logo3} alt="logo-image" className="w-[40px]" />
        <img
          src={Logo1}
          alt="logo-image"
          className="w-[25px] -ml-[14px]! rotate-[180deg] !mt-2"
        />
      </div>

      <div className=" logo-font text-[10px]">
        Trevor <span className="text-red-400 -ml-[3px]!">Tech</span>
      </div>
    </div>
  );
}

export default Logo
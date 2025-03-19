import React from "react";
import { Link } from "react-router-dom";
import productOfTheYear from '../../assets/images/productOfTheYear.webp'


const Offer = () => {
  return (
    <div className="xl:flex xl:items-center xl:justify-center xl:w-full 2xl:ml-10">
  
    <Link to="/mens">
      <div className=" w-full 2xl:w-[95%] 2xl:justify-items-center h-80 mb-10 bg-[#f3f3f3] md:bg-transparent relative font-titleFont ">
        <img src={productOfTheYear} alt=""  className="w-full h-full object-cover hidden md:inline-block"/>

        <div className="w-full md:w-2/3 xl:w-1/2 h-80 absolute px-4 md:px-0 top-0 right-0 flex flex-col items-start gap-6 justify-center ">
          <h1 className="text-3xl font-semibold text-primeColor">
            Product of The year
          </h1>
          <p className="text-base font-normal text-primeColor max-w-[600px] mr-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat
            cupiditate modi amet! Facilis, aperiam quaerat.
          </p>
          <button className="bg-slate-900 text-white text-lg font-bodyFont w-[185px] h-[50px] hover:bg-black duration-300 font-bold">
      Shop Now
    </button>
        </div>
      </div>
    </Link>
    </div>
  );
};

export default Offer;







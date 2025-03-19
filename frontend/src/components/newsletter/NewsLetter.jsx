import React from 'react';

const NewsLetter = () => {
  return (
    <div className="newsletter flex flex-col items-center justify-center w-full h-[40vh] md:h-[50vh] px-4 md:px-32 bg-gradient-to-b from-pink-100 via-green-100 to-transparent mb-20 gap-8 2xl:max-w-[85rem] 2xl:mx-auto 2xl:flex 2xl:justify-center 2xl:items-center">
      <h1 className="text-gray-700 text-2xl md:text-5xl font-semibold text-center">
        Get exclusive offers on your Email
      </h1>
      <p className="text-gray-700 text-base md:text-xl text-center">
        Subscribe to our newsletter and stay updated
      </p>
      <div className="flex items-center justify-between bg-white w-full md:w-[730px] h-[50px] rounded-full border border-gray-300 pl-2 md:pl-8">
        <input
          type="email"
          placeholder="Your email id"
          className="w-full md:w-[500px] py-2 px-4 text-gray-600 text-sm md:text-base border-none outline-none"
        />
        <button className="w-[200px] h-[50px] rounded-full bg-black text-white text-sm md:text-base cursor-pointer">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;

// import React from 'react';

// const NewsLetter = () => {
//   return (
//     <div className="newsletter flex flex-col items-center justify-center w-full h-[40vh] md:h-[50vh] px-4 md:px-32 bg-gradient-to-b from-pink-100 via-green-100 to-transparent mb-20 gap-8 2xl:max-w-[85rem] ">
//       <h1 className="text-gray-700 text-2xl md:text-5xl font-semibold">Get exclusive offers on your Email</h1>
//       <p className="text-gray-700 text-base md:text-xl">Subscribe to our newsletter and stay updated</p>
//       <div className="flex items-center justify-between bg-white w-full md:w-[730px] h-[50px] rounded-full border border-gray-300 pl-2 md:pl-8">
//         <input
//           type="email"
//           placeholder="Your email id"
//           className="w-full md:w-[500px] py-2 px-4 text-gray-600 text-sm md:text-base border-none outline-none"
//         />
//         <button className="w-[200px] h-[50px] rounded-full bg-black text-white text-sm md:text-base cursor-pointer">
//           Subscribe
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NewsLetter;





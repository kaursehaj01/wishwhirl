
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import bannerImgOne from '../../assets/images/bannerImgOne.webp';
import bannerImgTwo from '../../assets/images/bannerImgTwo.webp';
import bannerImgThree from '../../assets/images/bannerImgThree.webp';
import four from '../../assets/images/bannertwomain.png';
import ban1 from '../../assets/images/ban1.png'
import ban2 from '../../assets/images/ban2.png'
import ban3 from '../../assets/images/ban3.png'
import ban4 from '../../assets/images/ban4.png'
import ban5 from '../../assets/images/ban5.png'




const Hero = () => {
  const [dotActive, setDocActive] = useState(0);



  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev, next) => {
      setDocActive(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          top: "80%",
          left: "-40%",
          transform: "translateY(-30%)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                borderRight: "3px #262626 solid",
                padding: "8px 0",
                cursor: "pointer",
              }
            : {
                width: "30px",
                color: "transparent",
                borderRight: "3px white solid",
                padding: "8px 0",
                cursor: "pointer",
              }
        }
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: false,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "2%",
                transform: "translateY(-50%)",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };
  return (
    <div className="w-full  bg-white">
      <Slider {...settings}>
        <Link to="/mens">
          <div>
            <img src={ban5}  alt="" className="lg:h-[75vh] lg:w-full object-top  2xl:w-full " />
            
          </div>
        </Link>
        <Link to="/mens">
          <div>
            {/* <Image imgSrc={bannerImgTwo} /> */}
            <img src={ban2}  alt="" className="lg:h-[75vh] lg:w-full object-top 2xl:w-full"/>

          </div>
        </Link>
        <Link to="/mens">
          <div>
          <img src={ban1}  alt="" className="lg:h-[75vh] lg:w-full object-top 2xl:w-full" />

            {/* <Image imgSrc={bannerImgThree} /> */}
          </div>
        </Link>
      </Slider>
    </div>
  );
};

export default Hero;
          

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import ban1 from '../../assets/images/ban1.png';
// import ban2 from '../../assets/images/ban2.png';
// import ban3 from '../../assets/images/ban3.png';

// const Hero = () => {
//   const [dotActive, setDotActive] = useState(0);

//   const settings = {
//     dots: false,
//     infinite: true,
//     autoplay: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//     beforeChange: (prev, next) => setDotActive(next),
//     responsive: [
//       {
//         breakpoint: 576,
//         settings: {
//           dots: false,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="w-full bg-white">
//       <Slider {...settings}>
//         <Link to="/mens">
//           <div className="h-[70vh] flex justify-center items-center bg-slate-400">
//             <img
//               src={ban1}
//               alt="Banner 1"
//               className="h-full w-full object-contain"
//             />
//           </div>
//         </Link>
//         <Link to="/mens">
//           <div className="h-[70vh] flex justify-center items-center bg-gray-400">
//             <img
//               src={ban2}
//               alt="Banner 2"
//               className="h-full w-full object-contain"
//             />
//           </div>
//         </Link>
//         <Link to="/mens">
//           <div className="h-[70vh] flex justify-center items-center bg-gray-400">
//             <img
//               src={ban3}
//               alt="Banner 3"
//               className="h-full w-full object-contain"
//             />
//           </div>
//         </Link>
//       </Slider>
//     </div>
//   );
// };

// export default Hero;

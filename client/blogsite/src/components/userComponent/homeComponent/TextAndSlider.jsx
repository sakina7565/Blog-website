import React, { useState, useEffect } from "react";
import { BiCalendar, BiAlarm } from "react-icons/bi";
import img1 from "../../../assets/Images/img1.png";
import img2 from "../../../assets/Images/img2.png";
import img3 from "../../../assets/Images/img3.png";
import img4 from "../../../assets/Images/img4.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function TextAndSlider() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sliderSettings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: windowWidth < 768 ? 1 : windowWidth < 1024 ? 2 : 2,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
    adaptiveHeight: true,
    customPaging: i => (
      <div className="w-2 h-2 rounded-full bg-gray-400 mt-4"></div>
    ),
  };

  return (
    <div className="bg-[#262A2E] p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 items-start">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="mb-4 sm:mb-6">
            <p className="inline-flex items-center w-fit rounded-[20px] py-1 px-3 text-white bg-[#151819] mb-3 sm:mb-4 text-xs sm:text-sm">
              <span className="bg-[#ff006b] w-2 h-2 inline-block mr-2 rounded-full"></span>
              Fashion
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4 font-bold leading-tight whitespace-nowrap capitalize">
              "Fashion is  <span className="text-[#ff006b]">confidence worn."</span>
            </h2>
            <p className="text-gray-300 mb-4 text-sm sm:text-base md:text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-white text-xs sm:text-sm">
            <p className="flex items-center gap-1 sm:gap-2">
              <BiCalendar className="text-base sm:text-lg md:text-xl" />
              May 2, 2022
            </p>
            <span className="border-r-2 border-white h-4 mx-1"></span>
            <p className="flex items-center gap-1 sm:gap-2">
              <BiAlarm className="text-base sm:text-lg md:text-xl" />
              10:30 AM
            </p>
            <span className="border-r-2 border-white h-4 mx-1 hidden sm:inline"></span>
            <p className="flex items-center gap-1 sm:gap-2">
              <BiAlarm className="text-base sm:text-lg md:text-xl" />
              5 min read
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 lg:max-w-[50%] mt-6 lg:mt-0 w-full overflow-hidden">
          <Slider {...sliderSettings}>
            {[img1, img2, img3, img4].map((img, idx) => (
              <div key={idx} className="px-2 sm:px-3">
                <div className="relative w-full aspect-[3/4] rounded-xl sm:rounded-2xl border-2 border-gray-700 overflow-hidden bg-no-repeat bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}>
                  <div className="absolute w-[90%] bg-[#262A2E]/90 p-3 bottom-3.5 left-1/2 -translate-x-1/2 rounded-lg sm:rounded-xl">
                    <p className="text-white text-xs sm:text-sm font-medium uppercase mb-1 sm:mb-2">
                      AMITH DOD
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-white text-[10px] sm:text-xs">
                      <p className="flex items-center gap-1">
                        <BiCalendar className="text-xs sm:text-sm" /> 
                        <span>May 2, 2022</span>
                      </p>
                      <span className="border-r-2 border-white h-3 mx-1"></span>
                      <p className="flex items-center gap-1">
                        <BiAlarm className="text-xs sm:text-sm" /> 
                        <span>10:30 AM</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

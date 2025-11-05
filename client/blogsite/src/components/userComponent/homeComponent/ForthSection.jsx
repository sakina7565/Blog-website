import React from "react";
import img1 from "../../../assets/Images/forthSectionImg1.png";
import img2 from "../../../assets/Images/forthSectionImg2.png";
import img3 from "../../../assets/Images/forthSectionImg3.png";
import { BiCalendar, BiAlarm } from "react-icons/bi";

export default function ForthSection() {
  return (
    <div className="bg-[#262A2E] py-6 px-4 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-8">
        {/* === Upper Side === */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/3">
            <img
              src={img1}
              className="w-full h-full object-cover rounded-2xl"
              alt="Fashion main"
            />
          </div>

          {/* Text */}
          <div className="w-full lg:w-2/3 flex items-center">
            <div>
              <p className="inline-flex items-center w-fit rounded-[20px] py-[4px] px-[10px] text-white bg-[#151819] mb-4 text-sm sm:text-base">
                <span className="bg-[#ff006b] w-[10px] h-[10px] inline-block mr-2 rounded-full"></span>
                Fashion
              </p>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4 font-bold leading-tight capitalize">
                "Fashion is{" "}
                <span className="text-[#ff006b]">confidence worn."</span>
              </h2>

              <p className="text-gray-300 mb-4 text-sm sm:text-base md:text-lg">
                Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen
                book.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-white text-sm sm:text-base">
                <p className="flex items-center gap-2">
                  <BiCalendar className="text-lg sm:text-2xl" />
                  May 2, 2022
                </p>
                <span className="hidden sm:inline border-r-2 border-white h-5"></span>
                <p className="flex items-center gap-2">
                  <BiAlarm className="text-lg sm:text-2xl" />
                  10:30 AM
                </p>
                <p className="flex items-center gap-2">
                  <BiAlarm className="text-lg sm:text-2xl" />5 min read
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* === Lower Side (Two Cards) === */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Card 1 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full lg:w-1/2 rounded-2xl overflow-hidden p-4 md:p-6 bg-[#1f2327]">
            <div className="w-full md:w-1/2">
              <img
                src={img2}
                className="w-full h-full object-cover rounded-2xl"
                alt="Fashion illustration"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="md:ml-4">
                <p className="inline-flex items-center w-fit rounded-[20px] py-[4px] px-[10px] text-white bg-[#151819] mb-3 sm:mb-4 text-sm sm:text-base">
                  <span className="bg-[#ff006b] w-[10px] h-[10px] inline-block mr-2 rounded-full"></span>
                  Fashion
                </p>

                <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 font-bold leading-tight">
                  "Fashion is{" "}
                  <span className="text-[#ff006b]">confidence worn."</span>
                </h2>

                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s...
                </p>

                <div className="flex flex-wrap items-center gap-3 text-white text-xs sm:text-sm">
                  <p className="flex items-center gap-1 sm:gap-2">
                    <BiCalendar className="text-base sm:text-xl" />
                    May 2, 2022
                  </p>
                  <span className="hidden sm:inline border-r-2 border-white h-4"></span>
                  <p className="flex items-center gap-1 sm:gap-2">
                    <BiAlarm className="text-base sm:text-xl" />
                    10:30 AM
                  </p>
                  <p className="flex items-center gap-1 sm:gap-2">
                    <BiAlarm className="text-base sm:text-xl" />5 min read
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full lg:w-1/2 rounded-2xl overflow-hidden p-4 md:p-6 bg-[#1f2327]">
            <div className="w-full md:w-1/2">
              <img
                src={img3}
                className="w-full h-full object-cover rounded-2xl"
                alt="Fashion model"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="md:ml-4">
                <p className="inline-flex items-center w-fit rounded-[20px] py-[4px] px-[10px] text-white bg-[#151819] mb-3 sm:mb-4 text-sm sm:text-base">
                  <span className="bg-[#ff006b] w-[10px] h-[10px] inline-block mr-2 rounded-full"></span>
                  Fashion
                </p>

                <h2 className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 font-bold leading-tight">
                  "Fashion is{" "}
                  <span className="text-[#ff006b]">confidence worn."</span>
                </h2>

                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s...
                </p>

                <div className="flex flex-wrap items-center gap-3 text-white text-xs sm:text-sm">
                  <p className="flex items-center gap-1 sm:gap-2">
                    <BiCalendar className="text-base sm:text-xl" />
                    May 2, 2022
                  </p>
                  <span className="hidden sm:inline border-r-2 border-white h-4"></span>
                  <p className="flex items-center gap-1 sm:gap-2">
                    <BiAlarm className="text-base sm:text-xl" />
                    10:30 AM
                  </p>
                  <p className="flex items-center gap-1 sm:gap-2">
                    <BiAlarm className="text-base sm:text-xl" />5 min read
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

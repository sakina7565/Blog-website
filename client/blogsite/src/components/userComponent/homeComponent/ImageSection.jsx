import React from "react";
import img5 from "../../../assets/Images/img5.png";
import img6 from "../../../assets/Images/img6.png";
import img7 from "../../../assets/Images/img7.png";
import featuredImg1 from "../../../assets/Images/featuredImg1.png";
import featuredImg2 from "../../../assets/Images/featuredImg2.png";
import { BiCalendar, BiAlarm } from "react-icons/bi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

function ImageSection() {
  return (
    <div className="bg-[#262A2E] py-6 px-4 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Section */}
        <div className="flex-1 space-y-6">
          {/* Top two images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[img5, img6].map((img, idx) => {
              return (
                <div
                  key={idx}
                  className="w-full aspect-[417/344] rounded-2xl overflow-hidden"
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover object-center"
                    alt={`img-${idx}`}
                  />
                </div>
              );
            })}
          </div>

          {/* Bottom wide image */}
          <div className="w-full rounded-2xl overflow-hidden">
            <img
              src={img7}
              className="w-full h-full object-cover object-center"
              alt="img7"
            />
          </div>
        </div>

        {/* Right Section (Sidebar) */}
        <div className="w-full lg:w-[310px] bg-[#151819] rounded-2xl p-4 flex-shrink-0">
          {/* Featured Posts */}
          <div className="mb-8">
            <h5 className="text-[#ff006b] text-lg sm:text-xl mb-3">
              Featured Post
            </h5>
            {[featuredImg2, featuredImg1, featuredImg2, featuredImg1].map(
              (img, idx) => (
                <div key={idx} className="flex gap-2 p-1 mb-3">
                  <img
                    src={img}
                    alt="featured"
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <p className="text-white text-sm sm:text-base whitespace-nowrap">
                      Dress bold, feel unstoppable.
                    </p>
                    <p className="text-white flex items-center gap-1 text-sm">
                      <BiAlarm className="text-lg" /> 7 min read
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Latest Posts */}
          <div className="mb-8">
            <h5 className="text-[#ff006b] text-lg sm:text-xl mb-3">
              Latest Post
            </h5>
            {[featuredImg2, featuredImg1, featuredImg2, featuredImg1].map(
              (img, idx) => (
                <div key={idx} className="flex gap-2 p-1 mb-3">
                  <img
                    src={img}
                    alt="latest"
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div>
                    <p className="text-white text-sm sm:text-base whitespace-nowrap">
                      Dress bold, feel unstoppable.
                    </p>
                    <p className="text-white flex items-center gap-1 text-sm">
                      <BiAlarm className="text-lg" /> 7 min read
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageSection;

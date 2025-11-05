import React, { useEffect } from "react";
import { motion } from "framer-motion"; // ✅ import animation library
import img1 from "../../../assets/Images/img1.png";
import img2 from "../../../assets/Images/img2.png";
import img3 from "../../../assets/Images/img3.png";
import img4 from "../../../assets/Images/img4.png";
import featuredImg1 from "../../../assets/Images/featuredImg1.png";
import featuredImg2 from "../../../assets/Images/featuredImg2.png";
import { BiCalendar, BiAlarm } from "react-icons/bi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

import { useBlogs } from "../../../context/BlogDataContext";

function MainSection() {
  const { blog } = useBlogs();

  // useEffect(() => {
  //   console.log(blog);
  // }, [blog]);

  return (
    <div className="bg-[#262A2E] py-6 px-4 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row gap-6 items-start">
        {/* Left Section (Animated) */}
        <motion.div
          className="flex-1 space-y-6"
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }} // animates every scroll into view
          initial={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {blog.length === 0 ? (
            <p className="text-white text-center">Loading blogs...</p>
          ) : (
            blog.slice(0, 4).map((b, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col sm:flex-row bg-[#151819] p-4 sm:p-6 rounded-2xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: false }}
              >
                <div className="w-full sm:w-[220px] md:w-[260px] h-[200px] sm:h-[260px] rounded-2xl flex-shrink-0 overflow-hidden mb-4 sm:mb-0">
                  <img
                    src={`http://localhost:7000/images/${b.blogImage}`}
                    alt="Image"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                {/* Content */}
                <div className="sm:ml-5 flex flex-col justify-between">
                  <p className="inline-flex items-center w-fit rounded-[20px] py-[4px] px-[10px] bg-[#262A2E] mb-4 text-sm sm:text-base uppercase text-white">
                    <span className="bg-[#ff006b] w-[10px] h-[10px] inline-block mr-2 rounded-full"></span>
                    {b.categoryId?.name || "No Category"}
                  </p>

                  {(() => {
                    const shortTitle =
                      b.title.length > 40
                        ? b.title.slice(0, 40) + "..."
                        : b.title;

                    const words = shortTitle.split(" ");
                    const firstLine = words.slice(0, 3).join(" ");
                    const secondLine = words.slice(3).join(" ");
                    return (
                      <h1
                        className="text-xl sm:text-2xl md:text-3xl text-white mb-4 leading-snug"
                        style={{
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {firstLine + " "}
                        <span className="text-[#ff006b]">{secondLine}</span>
                      </h1>
                    );
                  })()}

                  <p className="text-gray-300 mb-4 text-sm sm:text-base">
                    {b.content.length>200?b.content.slice(0,200)+"...":b.content}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-white text-sm sm:text-base">
                    <p className="flex items-center gap-2">
                      <BiCalendar className="text-lg sm:text-2xl" />
                      {/* May 2, 2022 */}
                      {new Date(b.createdAt).toLocaleDateString()}
                    </p>
                    <span className="hidden sm:inline border-r-2 border-white h-5"></span>
                    <p className="flex items-center gap-2">
                      <BiAlarm className="text-lg sm:text-2xl" />
                      {/* 10:30 AM */}
                      {new Date(b.createdAt).toLocaleTimeString()}
                    </p>
                    <p className="flex items-center gap-2">
                      <BiAlarm className="text-lg sm:text-2xl" />5 min read
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Right Section (Sidebar stays same, no animation) */}
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

          {/* Newsletter */}
          <div className="bg-[#ff006b] w-full py-5 px-3 rounded-2xl mb-8">
            <h5 className="text-white text-center mb-5 text-base sm:text-lg">
              News Letter
            </h5>
            <form>
              <input
                type="text"
                placeholder="Your Name"
                className="bg-white w-full rounded-[10px] p-2 text-sm sm:text-base mb-3 text-gray-600"
              />
              <input
                type="text"
                placeholder="Your Email"
                className="bg-white w-full rounded-[10px] p-2 text-sm sm:text-base mb-3 text-gray-600"
              />
              <button
                type="submit"
                className="w-full bg-white rounded-[10px] p-2 text-sm sm:text-base text-gray-700 cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Social Icons */}
          <div className="flex gap-6 justify-center lg:justify-start">
            {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map(
              (Icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[#262A2E]"
                >
                  <Icon className="text-black text-lg sm:text-xl" />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainSection;

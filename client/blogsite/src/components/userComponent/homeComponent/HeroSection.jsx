import React from "react";
import { motion } from "framer-motion";
import bgImage from "../../../assets/Images/heroSectionImg.png";

export default function HeroSection() {
  return (
    <div className="w-full bg-[#151819]">
      <div
        className="relative bg-contain bg-center bg-no-repeat h-[300px] sm:h-[340px] md:h-[360px] lg:h-[400px] xl:h-[400px] mx-auto overflow-hidden"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        {/* Center Content */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false }} // <-- important: triggers every time
            className="text-[#ffffff] text-center text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl uppercase"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            MID <span className="text-[#ff006b]">SESSION</span> SALE
          </motion.h1>

          <motion.p
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: false }}
            className="text-[#ffffff] text-center text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px]"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            FLAT 30% OFF ON
          </motion.p>
        </div>

        {/* Background Outline Text */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.2 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: false }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[12%] w-full"
        >
          <p
            className="text-[14vw] text-center whitespace-nowrap tracking-widest text-transparent"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              WebkitTextStroke: "2px #414141",
            }}
          >
            MID SESSION SALE
          </p>
        </motion.div>
      </div>
    </div>
  );
}


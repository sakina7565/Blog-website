import React from "react";
import Logo from "../../assets/Images/blogsiteLogo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "About", href: "/about", current: false },
    { name: "Signal Post", href: "/signal-post", current: false },
    { name: "Pages", href: "/pages", current: false },
    { name: "Contact Us", href: "/contact", current: false },
    { name: "Features", href: "/features", current: false },
  ];

  return (
    <div className="w-full bg-[#151819] py-12 px-6 sm:px-12">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        <p className="inline-flex items-center rounded-[20px] py-[2px] px-[12px] bg-[#262A2E] text-sm sm:text-base text-white">
          <span className="bg-[#ff006b] w-[10px] h-[10px] inline-block mr-2 rounded-full"></span>
          Fashion
        </p>

        {/* Logo */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <button>
            <img src={Logo} alt="logo" className="h-10 sm:h-12" />
          </button>
        </div>
      </div>

      <div className="mt-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center lg:text-left">
        {/* Quick Links */}
        <div>
          <h3 className="text-white text-2xl sm:text-3xl mb-4">Quick Links</h3>
          {navigation.map((link, idx) => (
            <div key={idx} className="py-1">
              <Link
                to={link.href}
                className="text-gray-300 hover:text-white text-sm sm:text-base"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white text-2xl sm:text-3xl mb-4">Services</h3>
          {[
            "Latest Post",
            "Latest Post",
            "Latest Post",
            "Latest Post",
            "Latest Post",
          ].map((item, idx) => (
            <p
              key={idx}
              className="text-gray-300 hover:text-white py-1 text-sm sm:text-base"
            >
              {item}
            </p>
          ))}
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-white text-2xl sm:text-3xl mb-4">Contact Us</h3>
          <p className="text-gray-300 hover:text-white uppercase py-1 text-sm sm:text-base">
            new york near losangles
          </p>
          <p className="text-gray-300 hover:text-white py-1 text-sm sm:text-base">
            03100937182
          </p>
          <p className="text-gray-300 hover:text-white uppercase py-1 text-sm sm:text-base">
            ui/uxdesign@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
}

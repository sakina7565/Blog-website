import React, { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCategory, useSubCategory } from "../../context/CategoryDataContext";
import { useNavigate, useLocation } from "react-router-dom";
import CategroiesPage from "./CategoriesComponent/CategroiesPage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { categories, fetchAllCategories, updateCategories } = useCategory();
  const { subCategories, getAllSubcategoryData } = useSubCategory();
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const navigation = categories;

  const isCategoryPage = location.pathname === "/user/category";

  function NextArrow({ onClick }) {
    return (
      <div
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer 
                   bg-white/10 hover:bg-white/20 text-white p-2 rounded-full shadow-lg 
                   transition duration-200"
        onClick={onClick}
      >
        <ChevronRightIcon className="w-6 h-6" />
      </div>
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <div
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer 
                   bg-white/10 hover:bg-white/20 text-white p-2 rounded-full shadow-lg 
                   transition duration-200"
        onClick={onClick}
      >
        <ChevronLeftIcon className="w-6 h-6" />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const filteredSubCategory = subCategories?.filter(
    (sub) => sub.category === activeCategory
  );

  useEffect(() => {
    if (activeCategory) {
      getAllSubcategoryData(activeCategory);
    }
  }, [activeCategory]);

  useEffect(() => {
    if (location.pathname === "/user" || location.pathname === "/user/home") {
      setActiveCategory(null);

      const cat = categories.find((cat) => cat.current == true);
      if (!cat) return;
      const category = {
        ...cat,
        current: false,
      };
      updateCategories(cat._id, category);
    }
  }, [location.pathname]);

  const handleCurrent = async (id) => {
    const clickedCategory = categories.find((cat) => cat._id === id);
    const isActiveCategory = clickedCategory.current;

    const updatedCategories = categories.map((cat) =>
      isActiveCategory
        ? { ...cat, current: true }
        : cat._id === id
        ? { ...cat, current: true }
        : { ...cat, current: false }
    );

    const selectedCategory = updatedCategories.find((cat) => cat._id === id);
    if (!selectedCategory) return;

    await updateCategories(id, selectedCategory);

    const otherActiveCategories = categories.filter(
      (cat) => cat._id !== id && cat.current === true
    );

    for (const cat of otherActiveCategories) {
      await updateCategories(cat._id, { ...cat, current: false });
    }
  };

  return (
    <>
      {/* === Navbar === */}
      <Disclosure as="nav" className="w-full">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-[#151819] rounded-[18px]">
              <div className="flex h-16 items-center justify-between">
                {/* Mobile menu button */}
                <div className="flex sm:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>

                {/* Desktop Menu */}
                <div className="hidden sm:flex flex-1 overflow-hidden">
                  <div className="w-full">
                    <Slider key={categories.length} {...settings}>
                      {navigation.map((item) => (
                        <div key={item._id} className="px-1">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveCategory(
                                activeCategory === item._id ? null : item._id
                              );
                              handleCurrent(item._id);
                            }}
                            aria-current={item.current ? "page" : undefined}
                            className={classNames(
                              item.current
                                ? "bg-gray-800 text-white"
                                : "text-gray-300 hover:bg-white/5 hover:text-white",
                              "block text-center rounded-md px-3 py-2 text-sm font-medium uppercase whitespace-nowrap"
                            )}
                          >
                            {item.name}
                          </a>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>

                {/* Mobile Menu */}
                <DisclosurePanel className="sm:hidden">
                  <div className="space-y-1 px-2 pt-2 pb-3">
                    {navigation.map((item) => (
                      <DisclosureButton
                        key={item._id}
                        as="button"
                        href="#"
                        onClick={() =>
                          setActiveCategory(
                            activeCategory === item._id ? null : item._id
                          )
                        }
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-white/5 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium w-full text-left"
                        )}
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </div>
                </DisclosurePanel>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      {/* === Subcategories Section (Below Navbar) === */}
      {!isCategoryPage && filteredSubCategory.length > 0 && (
        <div className="mx-auto max-w-7xl mt-3 bg-[#1d2021] rounded-lg p-3">
          <h3 className="text-white text-sm font-semibold mb-2 uppercase tracking-wide">
            Subcategories
          </h3>
          <div className="flex flex-wrap gap-2">
            {filteredSubCategory.map((sub) => (
              <button
                key={sub._id}
                onClick={() => navigate("/user/category")}
                className="text-gray-800 hover:text-white hover:bg-gray-700 bg-gray-400 rounded-md px-3 py-1 text-lg font-bold transition duration-150"
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

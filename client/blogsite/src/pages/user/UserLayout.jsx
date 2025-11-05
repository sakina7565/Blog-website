import React from "react";
import LogoSection from "../../components/userComponent/LogoSection";
import Footer from "../../components/userComponent/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <>
      <LogoSection />
      <Outlet/>
      <Footer />
    </>
  );
}

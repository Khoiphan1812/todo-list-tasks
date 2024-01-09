import React from "react";
import "./style.scss";
import HeaderComponent from "../../components/HeaderComponent";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout-container">
      <HeaderComponent />
      <div className="main-layout-container_content">
        <SideBar />
        <div className="right-side">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;

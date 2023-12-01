import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/ui/MainNav";
import styled from "./Root.module.scss";

const Root: React.FC = () => {
  return (
    <div className={styled.container}>
      <MainNav />
      <div className={styled.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;

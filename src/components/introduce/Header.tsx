import React from "react";
import styled from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={styled.container}>
      <div className={styled.backImg}>
        <div className={styled.cover}>
          <h1>INTRODUCE</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;

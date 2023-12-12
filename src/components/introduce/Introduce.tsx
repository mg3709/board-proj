import React from "react";
import styled from "./Introduce.module.scss";
import Header from "./Header";
import Middle from "./Middle";
import Content from "./Content";

const Introduce: React.FC = () => {
  return (
    <div>
      <Header />
      <Middle />
      <Content />
      <div className={styled.line}></div>
    </div>
  );
};

export default Introduce;

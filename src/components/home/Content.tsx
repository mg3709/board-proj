import React from "react";
import styled from "./Content.module.scss";

const Content: React.FC<{ data: number }> = (props) => {
  const { data } = props;

  return (
    <li className={styled.container}>
      <p>{data}</p>
    </li>
  );
};

export default Content;

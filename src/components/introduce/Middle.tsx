import React from "react";
import styled from "./Middle.module.scss";

const Middle: React.FC = () => {
  return (
    <div className={styled.container}>
      <h1>지식 / 경험을 공유하세요</h1>
      <div className={styled.content}>
        <div className={styled.box}>
          <h2>READ</h2>
          <p>다른 이용자의 글들을 읽어보세요.</p>
          <button>CLICK HERE</button>
        </div>
        <div className={styled.box}>
          <h2>WRITE</h2>
          <p>보고 공유 할 수 있는 글들을 작성해보세요.</p>
          <button>CLICK HERE</button>
        </div>
        <div className={styled.box}>
          <h2>COMMENT</h2>
          <p>다른 이용자의 글에 공감하고 의견을 달아보세요.</p>
          <button>CLICK HERE</button>
        </div>
      </div>
    </div>
  );
};

export default Middle;

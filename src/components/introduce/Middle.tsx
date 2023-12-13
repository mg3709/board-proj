import React from "react";
import styled from "./Middle.module.scss";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const Middle: React.FC = () => {
  const nav = useNavigate();

  const { scrollY } = useScroll();
  const pageY = useTransform(scrollY, [0, 700], [500, 0]);
  const scaleY = useTransform(scrollY, [0, 700], [0.5, 1]);
  const opacityY = useTransform(scrollY, [0, 700], [0, 1]);

  return (
    <motion.div
      style={{ y: pageY, scale: scaleY, opacity: opacityY }}
      className={styled.container}
    >
      <h1>지식 / 경험을 공유하세요</h1>
      <div className={styled.content}>
        <div className={styled.box}>
          <h2>READ</h2>
          <p>다른 이용자의 글들을 읽어보세요.</p>
          <button onClick={() => nav("/book")}>시작하기</button>
        </div>
        <div className={styled.box}>
          <h2>WRITE</h2>
          <p>보고 공유 할 수 있는 글들을 작성해보세요.</p>
          <button onClick={() => nav("/write")}>시작하기</button>
        </div>
        <div className={styled.box}>
          <h2>COMMENT</h2>
          <p>다른 이용자의 글에 공감하고 의견을 달아보세요.</p>
          <button onClick={() => nav("/board")}>시작하기</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Middle;

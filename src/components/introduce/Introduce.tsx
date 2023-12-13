import React from "react";
import styled from "./Introduce.module.scss";
import Header from "./Header";
import Middle from "./Middle";
import Content from "./Content";
import { motion, useTransform, useScroll } from "framer-motion";

const Introduce: React.FC = () => {
  const { scrollY } = useScroll();
  const lineY = useTransform(scrollY, [0, 3000], [0, 2000]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring" }}
    >
      <Header />
      <Middle />
      <Content />
      <motion.div style={{ width: lineY }} className={styled.line}></motion.div>
    </motion.div>
  );
};

export default Introduce;

import React from "react";
import styled from "./MainNav.module.scss";
import Logo from "../../img/Logo.png";
import { motion, useTransform, useScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MainNav: React.FC = () => {
  const { scrollY } = useScroll();
  const pageY = useTransform(scrollY, [0, 1000], [0, 1000]);

  const nav = useNavigate();

  return (
    <motion.div style={{ y: pageY }} className={styled.container}>
      <div className={styled.sidebar}>
        <img onClick={() => nav("/")} src={Logo} alt="logo" />
        <ul>
          <li onClick={() => nav("/introduce")}>
            <p>INTRODUCE</p>
          </li>
          <li onClick={() => nav("/book")}>
            <p>BOOK</p>
          </li>
          <li onClick={() => nav("/board")}>
            <p>BOARD</p>
          </li>
          <li onClick={() => nav("/write")}>
            <p>WRITE</p>
          </li>
        </ul>
      </div>
    </motion.div>
  );
};

export default MainNav;

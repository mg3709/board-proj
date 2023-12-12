import React from "react";
import styled from "./Header.module.scss";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const nav = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring" }}
      className={styled.img}
    >
      <div className={styled.cover}>
        <h1>HOT CONTENT</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring" }}
          onClick={() => nav("/write")}
        >
          GET START
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Header;

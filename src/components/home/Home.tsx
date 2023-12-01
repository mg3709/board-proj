import React from "react";
import styled from "./Home.module.scss";
import Content from "./Content";
import { motion } from "framer-motion";

const DUMMY = [1, 2, 3, 4, 5, 6];

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring" }}
      className={styled.container}
    >
      <ul>
        {DUMMY.map((e) => (
          <Content key={e} data={e} />
        ))}
      </ul>
    </motion.div>
  );
};

export default Home;

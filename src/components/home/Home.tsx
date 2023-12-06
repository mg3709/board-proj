import React from "react";
import styled from "./Home.module.scss";
import Content from "./Content";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { hotContentBoardHandler, hotContentBookHandler } from "../../util/http";
import { IdBoard } from "../../model/Type";

const Home: React.FC = () => {
  const boardQuery = useQuery({
    queryKey: ["hot-board"],
    queryFn: hotContentBoardHandler,
  });

  const bookQuery = useQuery({
    queryKey: ["hot-book"],
    queryFn: hotContentBookHandler,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring" }}
      className={styled.container}
    >
      <ul>
        {boardQuery.data &&
          boardQuery.data.map((e: IdBoard) => (
            <Content key={e._id.toString()} data={e} />
          ))}
        {bookQuery.data &&
          bookQuery.data.map((e: IdBoard) => (
            <Content key={e._id.toString()} data={e} />
          ))}
      </ul>
    </motion.div>
  );
};

export default Home;

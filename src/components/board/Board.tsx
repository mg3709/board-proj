import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchBoardsHandler } from "../../util/http";
import BoardList from "./BoardList";
import { IdBoard } from "../../model/Type";
import styled from "./Board.module.scss";
import { motion } from "framer-motion";

const Board: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["board"],
    queryFn: fetchBoardsHandler,
  });

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>{error.message}</p>;
  }
  if (data) {
    content =
      data &&
      data.map((e: IdBoard) => <BoardList key={e._id.toString()} data={e} />);
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
      }}
      initial="hidden"
      animate="visible"
    >
      <motion.ul
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        className={styled.container}
      >
        {content}
      </motion.ul>
    </motion.div>
  );
};

export default Board;

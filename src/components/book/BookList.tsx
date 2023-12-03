import React from "react";
import { IdBoard } from "../../model/Type";
import styled from "./BookList.module.scss";
import { motion } from "framer-motion";

const BookList: React.FC<{ data: IdBoard }> = (props) => {
  const { data } = props;

  return (
    <li className={styled.container}>
      <img src={data.image} alt="img" />
      <motion.div
        whileHover={{ backgroundColor: "#ccc" }}
        className={styled.card}
      >
        <div>
          <h2>{data.title}</h2>
          <p>{data.name}</p>
        </div>
        <p>{data.date}</p>
      </motion.div>
    </li>
  );
};

export default BookList;

import React from "react";
import { IdBoard } from "../../model/Type";
import styled from "./BoardList.module.scss";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BoardList: React.FC<{ data: IdBoard }> = (props) => {
  const { data } = props;
  const id = data._id.toString();

  const nav = useNavigate();

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, scale: 1 },
        visible: { opacity: 1, scale: [0.9, 1.1, 1] },
      }}
      onClick={() => nav(`/board/${id}`)}
      className={styled.container}
    >
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
    </motion.li>
  );
};

export default BoardList;

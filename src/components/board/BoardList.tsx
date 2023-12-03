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
    <li onClick={() => nav(`/board/${id}`)} className={styled.container}>
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

export default BoardList;

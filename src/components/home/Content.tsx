import React from "react";
import styled from "./Content.module.scss";
import { IdBoard } from "../../model/Type";
import { motion } from "framer-motion";

const Content: React.FC<{ data: IdBoard }> = (props) => {
  const { data } = props;

  console.log(data.image);

  const Images = {
    backgroundImage: `url(${data.image})`,
  };

  return (
    <li className={styled.container}>
      <div className={styled.card} style={Images}>
        <motion.div
          className={styled.cover}
          whileHover={{ opacity: 1 }}
          style={{ opacity: 0 }}
        >
          <div className={styled.info}>
            <h2>{data.title.slice(0, 12)}</h2>
            <p>{data.name.slice(0, 12)}</p>
          </div>
          <p>{data.date}</p>
        </motion.div>
      </div>
    </li>
  );
};

export default Content;

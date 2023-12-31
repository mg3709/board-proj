import React from "react";
import styled from "./BoardComment.module.scss";
import { CommentList } from "../../model/Type";

const BoardComment: React.FC<{ comment: CommentList }> = (props) => {
  const { comment } = props;

  return (
    <li className={styled.container}>
      <p>{comment.text}</p>
      <p>{comment.time}</p>
    </li>
  );
};

export default BoardComment;

import React from "react";
import styled from "./BookComment.module.scss";
import { CommentList } from "../../model/Type";

const BookComment: React.FC<{ comment: CommentList }> = (props) => {
  const { comment } = props;

  return (
    <li className={styled.container}>
      <p>{comment.text}</p>
      <p>{comment.time}</p>
    </li>
  );
};

export default BookComment;

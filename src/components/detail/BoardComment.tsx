import React from "react";
import styled from "./BoardComment.module.scss";
import { Comments } from "../../model/Type";

const BoardComment: React.FC<{ comment: Comments }> = (props) => {
  const { comment } = props;

  console.log(comment);

  return (
    <div>
      {comment[0].text}
      {comment[0].time}
    </div>
  );
};

export default BoardComment;

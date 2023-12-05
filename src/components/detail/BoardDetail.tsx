import React, { ChangeEvent, useState } from "react";
import styled from "./BoardDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBoardHandler } from "../../util/http";
import BoardComment from "./BoardComment";
import { Comments } from "../../model/Type";

const BoardDetail: React.FC = () => {
  const nav = useNavigate();
  const params = useParams();
  const id = params.id!;
  const [comment, setComment] = useState("");

  const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const resetComment = () => {
    setComment("");
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["board", id],
    queryFn: () => fetchBoardHandler(id),
  });

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>{error.message}</p>;
  }
  if (data) {
    content = (
      <div className={styled.container}>
        <div className={styled.card}>
          <h1>{data.title}</h1>
          <div className={styled.line}></div>
          <div className={styled.info}>
            <p>{data.name}</p>
            <p>{data.date}</p>
          </div>
          <div className={styled.img}>
            <img src={data.image} alt="img" />
          </div>
          <div className={styled.content}>
            <p>{data.content}</p>
          </div>
        </div>
        <div className={styled.comment}>
          <label htmlFor="comment">전체 댓글</label>
          <div className={styled.line}></div>
          <BoardComment comment={data.comment} />
          <div className={styled.inputbox}>
            <input
              type="text"
              id="comment"
              onChange={onChangeComment}
              value={comment}
            />
            <div>
              <button>등록</button>
              <button onClick={resetComment}>취소</button>
            </div>
          </div>
        </div>
        <button onClick={() => nav(-1)}>BACK</button>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default BoardDetail;

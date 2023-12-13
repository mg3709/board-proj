import React, { ChangeEvent, useState } from "react";
import styled from "./BoardDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchBoardHandler,
  queryClient,
  writeBoardCommentHandler,
} from "../../util/http";
import BoardComment from "./BoardComment";
import { CommentList } from "../../model/Type";
import { motion } from "framer-motion";

const BoardDetail: React.FC = () => {
  const nav = useNavigate();
  const params = useParams();
  const id = params.id!;
  const [comment, setComment] = useState("");

  const currentDate = new Date();
  const hours = currentDate.getHours().toString();
  const minutes = currentDate.getMinutes().toString();

  const onChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const resetComment = () => {
    setComment("");
  };

  const commentData: CommentList = {
    text: comment,
    time: `${hours}:${minutes}`,
  };

  const boardMutation = useMutation({
    mutationFn: () => writeBoardCommentHandler(id, commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board", id],
      });
      resetComment();
    },
  });

  const addCommentHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.length === 0) {
      return;
    }
    boardMutation.mutate();
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
      <form onSubmit={addCommentHandler}>
        <div className={styled.container}>
          <div className={styled.card}>
            <h1>{data.title.slice(0, 12)}</h1>
            <div className={styled.line}></div>
            <div className={styled.info}>
              <p>{data.name.slice(0, 12)}</p>
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
            <label htmlFor="comment">전체 댓글 {data.comment.length}개</label>
            <div className={styled.line}></div>
            <ul>
              {data.comment.map((e: CommentList) => (
                <BoardComment key={e.time} comment={e} />
              ))}
            </ul>
            <div className={styled.inputbox}>
              <input
                type="text"
                id="comment"
                onChange={onChangeComment}
                value={comment}
              />
              <div>
                <button type="submit" onClick={addCommentHandler}>
                  등록
                </button>
                <button onClick={resetComment}>취소</button>
              </div>
            </div>
          </div>
          <button onClick={() => nav(-1)}>BACK</button>
        </div>
      </form>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring" }}
    >
      <p>
        <span className={styled.ui} onClick={() => nav("/board")}>
          BOARD
        </span>{" "}
        &rarr; <span className={styled.ui}>DETAIL</span>
      </p>
      {content}
    </motion.div>
  );
};

export default BoardDetail;

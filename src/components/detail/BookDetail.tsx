import React, { useState, ChangeEvent } from "react";
import styled from "./BookDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchBookHandler,
  queryClient,
  writeBookCommentHandler,
} from "../../util/http";
import BookComment from "./BookComment";
import { CommentList } from "../../model/Type";

const BookDetail: React.FC = () => {
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

  const bookMutation = useMutation({
    mutationFn: () => writeBookCommentHandler(id, commentData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["book", id],
      });
      resetComment();
    },
  });

  const addCommentHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.length === 0) {
      return;
    }
    bookMutation.mutate();
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookHandler(id),
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
                <BookComment key={e.time} comment={e} />
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
    <div>
      <p>BOOK &rarr; DETAIL</p>
      {content}
    </div>
  );
};

export default BookDetail;

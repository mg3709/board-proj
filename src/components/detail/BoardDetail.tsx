import React from "react";
import styled from "./BoardDetail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBoardHandler } from "../../util/http";

const BoardDetail: React.FC = () => {
  const nav = useNavigate();
  const params = useParams();
  const id = params.id!;

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
    );
  }

  return (
    <div className={styled.container}>
      {content}
      <button onClick={() => nav(-1)}>BACK</button>
    </div>
  );
};

export default BoardDetail;

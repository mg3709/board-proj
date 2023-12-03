import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchBoardsHandler } from "../../util/http";
import BoardList from "./BoardList";
import { IdBoard } from "../../model/Type";
import styled from "./Board.module.scss";

const Board: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["board"],
    queryFn: fetchBoardsHandler,
  });

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = <p>{error.message}</p>;
  }
  if (data) {
    content =
      data &&
      data.map((e: IdBoard) => <BoardList key={e._id.toString()} data={e} />);
  }

  return <ul className={styled.container}>{content}</ul>;
};

export default Board;

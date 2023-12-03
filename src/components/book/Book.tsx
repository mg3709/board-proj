import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchBooksHandler } from "../../util/http";
import BookList from "./BookList";
import { IdBoard } from "../../model/Type";
import styled from "./Book.module.scss";

const Book: React.FC = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["book"],
    queryFn: fetchBooksHandler,
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
      data.map((e: IdBoard) => <BookList key={e._id.toString()} data={e} />);
  }
  return <ul className={styled.container}>{content}</ul>;
};

export default Book;

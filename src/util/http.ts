import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BoardType, CommentList } from "../model/Type";

export const queryClient = new QueryClient();

export const writeBoardHandler = async (formData: BoardType) => {
  const res = await axios.post(
    "http://localhost:8081/api/write-board",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = res.data;
  console.log(data);
  return data;
};

export const writeBookHandler = async (formData: BoardType) => {
  const res = await axios.post(
    "http://localhost:8081/api/write-book",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = res.data;
  console.log(data);
  return data;
};

export const fetchBoardsHandler = async () => {
  const res = await axios.get("http://localhost:8081/api/get-board");
  const data = res.data;
  console.log(data);
  return data;
};

export const fetchBooksHandler = async () => {
  const res = await axios.get("http://localhost:8081/api/get-book");
  const data = res.data;
  console.log(data);
  return data;
};

export const fetchBoardHandler = async (id: string) => {
  const res = await axios.get(`http://localhost:8081/api/detail-board/${id}`);
  const data = res.data;
  console.log(data);
  return data;
};

export const fetchBookHandler = async (id: string) => {
  const res = await axios.get(`http://localhost:8081/api/detail-book/${id}`);
  const data = res.data;
  console.log(data);
  return data;
};

export const writeBoardCommentHandler = async (
  id: string,
  commentData: CommentList
) => {
  const res = await axios.put(
    `http://localhost:8081/api/board-comment/${id}`,
    commentData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = res.data;
  console.log(data);
  return data;
};

export const writeBookCommentHandler = async (
  id: string,
  commentData: CommentList
) => {
  const res = await axios.put(
    `http://localhost:8081/api/book-comment/${id}`,
    commentData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = res.data;
  console.log(data);
  return data;
};

export const hotContentBoardHandler = async () => {
  const res = await axios.get("http://localhost:8081/api/hot-board");
  const data = res.data;
  console.log(data);
  return data;
};

export const hotContentBookHandler = async () => {
  const res = await axios.get("http://localhost:8081/api/hot-book");
  const data = res.data;
  console.log(data);
  return data;
};

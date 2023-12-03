import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BoardType } from "../model/Type";

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

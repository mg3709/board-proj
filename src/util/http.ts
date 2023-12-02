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

import { ObjectId } from "mongodb";

export type BoardType = {
  title: string;
  name: string;
  image: string;
  content: string;
  date: string;
};

export type IdBoard = BoardType & {
  _id: ObjectId;
};

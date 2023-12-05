import { ObjectId } from "mongodb";

export type BoardType = {
  title: string;
  name: string;
  image: string;
  content: string;
  comment: Comments;
  date: string;
};

export type Comments = {
  text: string;
  time: string;
}[];

export type CommentList = {
  text: string;
  time: string;
};

export type IdBoard = BoardType & {
  _id: ObjectId;
};

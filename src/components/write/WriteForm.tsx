import React, { useState } from "react";
import styled from "./WriteForm.module.scss";
import { motion } from "framer-motion";
import useInput from "../../hook/use-input";
import { BoardType } from "../../model/Type";
import { useMutation } from "@tanstack/react-query";
import {
  queryClient,
  writeBoardHandler,
  writeBookHandler,
} from "../../util/http";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WriteForm: React.FC = () => {
  const [selectForm, setSelectForm] = useState<boolean>(false);
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  const nav = useNavigate();

  const boardMutation = useMutation({
    mutationFn: writeBoardHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["board"],
      });
      nav("/");
    },
  });
  const bookMutation = useMutation({
    mutationFn: writeBookHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["book"],
      });
      nav("/");
    },
  });

  const {
    value: title,
    onChangeValue: onChangeTitle,
    valueCheckValue: titleCheck,
    onBlurValue: onBlurTitle,
    reset: resetTitle,
  } = useInput((value) => value.length !== 0);

  const {
    value: name,
    onChangeValue: onChangeName,
    valueCheckValue: nameCheck,
    onBlurValue: onBlurName,
    reset: resetName,
  } = useInput((value) => value.length !== 0);

  const {
    value: content,
    onChangeValue: onChangeContent,
    valueCheckValue: contentCheck,
    onBlurValue: onBlurContent,
    reset: resetContent,
  } = useInput((value) => value.length !== 0);

  const [file, setFile] = useState<File[] | null>(null);
  const [blur, setBlur] = useState(false);

  const imageCheck = file && file.length !== 0;
  const imageCheckValue = blur && !imageCheck;

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? Array.from(e.target.files) : null);
  };

  const onBlurImage = () => {
    setBlur(true);
  };

  const resetImage = () => {
    setFile(null);
    setBlur(false);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    if (file && file.length > 0) {
      formData.append("image", file[0]);
    }
    try {
      const res = await axios.post(
        "http://localhost:8081/api/img-upload",
        formData
      );
      const data = res.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("이미지 업로드 오류 : ", error);
    }
  };

  const formHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (titleCheck || nameCheck || imageCheckValue || contentCheck) {
      console.log("입력해주세요");
      return;
    }
    //이미지 url 가져오기
    const imageUrl = await handleUpload();

    const Time = new Date();
    const currentTime = new Date().toLocaleDateString();

    const hour = Time.getHours().toString();
    const minutes = Time.getMinutes().toString();

    const formData: BoardType = {
      title: title,
      name: name,
      image: imageUrl,
      content: content,
      comment: [{ text: "댓글을 추가해주세요", time: `${hour}:${minutes}` }],
      date: currentTime,
    };

    console.log(formData);

    if (!selectForm) {
      boardMutation.mutate(formData);
    }
    if (selectForm) {
      bookMutation.mutate(formData);
    }

    resetTitle();
    resetName();
    resetImage();
    resetContent();
  };

  const boardButtonHandler = () => {
    setSelectForm(false);
    setIsAnimate(false);
  };

  const bookButtonHandler = () => {
    setSelectForm(true);
    setIsAnimate(true);
  };

  return (
    <motion.div
      key={isAnimate ? "animate" : "initial"}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring" }}
      className={styled.container}
    >
      <div className={styled.btns}>
        <motion.button
          style={{ backgroundColor: selectForm ? "#ccc" : "#08088a" }}
          onClick={boardButtonHandler}
        >
          BOARD
        </motion.button>
        <motion.button
          style={{ backgroundColor: selectForm ? "#08088a" : "#ccc" }}
          onClick={bookButtonHandler}
        >
          BOOK
        </motion.button>
      </div>
      <form onSubmit={formHandler}>
        <div className={styled.card}>
          {selectForm && <h1>BOOK</h1>}
          {!selectForm && <h1>BOARD</h1>}
          <div className={titleCheck ? styled.invalid : styled.control}>
            <label htmlFor="title">title</label>
            <input
              type="text"
              id="title"
              onChange={onChangeTitle}
              onBlur={onBlurTitle}
              value={title}
            />
            {titleCheck && (
              <p className={styled.error}>제목을 다시 확인하세요</p>
            )}
          </div>
          <div className={nameCheck ? styled.invalid : styled.control}>
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              onChange={onChangeName}
              onBlur={onBlurName}
              value={name}
            />
            {nameCheck && (
              <p className={styled.error}>이름을 다시 확인하세요</p>
            )}
          </div>
          <div className={imageCheckValue ? styled.bad : styled.good}>
            <label htmlFor="img">Image</label>
            <input
              type="file"
              id="img"
              onChange={onChangeImage}
              onBlur={onBlurImage}
            />
            {imageCheckValue && (
              <p className={styled.error}>이미지를 다시 확인하세요</p>
            )}
          </div>
          <div className={contentCheck ? styled.invalid : styled.control}>
            <label htmlFor="content">content</label>
            <textarea
              name="content"
              id="content"
              onChange={onChangeContent}
              onBlur={onBlurContent}
              value={content}
            ></textarea>
            {contentCheck && (
              <p className={styled.error}>본문을 다시 확인하세요</p>
            )}
          </div>
          <div>
            <button type="submit" onClick={formHandler}>
              ADD
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default WriteForm;

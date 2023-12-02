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

const WriteForm: React.FC = () => {
  const [selectForm, setSelectForm] = useState(false);
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
    value: image,
    onChangeValue: onChangeImage,
    valueCheckValue: imageCheck,
    onBlurValue: onBlurImage,
    reset: resetImage,
  } = useInput((value) => value.length !== 0);

  const {
    value: content,
    onChangeValue: onChangeContent,
    valueCheckValue: contentCheck,
    onBlurValue: onBlurContent,
    reset: resetContent,
  } = useInput((value) => value.length !== 0);

  const formHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (titleCheck || nameCheck || imageCheck || contentCheck) {
      return;
    }

    const currentTime = new Date().toLocaleDateString();

    const formData: BoardType = {
      title: title,
      name: name,
      image: image,
      content: content,
      date: currentTime,
    };

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

  return (
    <div className={styled.container}>
      <div className={styled.btns}>
        <motion.button
          style={{ backgroundColor: selectForm ? "#ccc" : "#9A2EFE" }}
          onClick={() => setSelectForm(false)}
        >
          BOARD
        </motion.button>
        <motion.button
          style={{ backgroundColor: selectForm ? "#9A2EFE" : "#ccc" }}
          onClick={() => setSelectForm(true)}
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
          <div className={imageCheck ? styled.invalid : styled.control}>
            <label htmlFor="img">Image</label>
            <input
              type="url"
              id="img"
              onChange={onChangeImage}
              onBlur={onBlurImage}
              value={image}
            />
            {imageCheck && (
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
    </div>
  );
};

export default WriteForm;

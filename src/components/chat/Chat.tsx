import React, { useState, useEffect, useRef } from "react";
import styled from "./Chat.module.scss";
import io from "socket.io-client";
import { motion } from "framer-motion";

const DOMAIN =
  "http://ec2-52-79-47-176.ap-northeast-2.compute.amazonaws.com:8082";
const socket = io(`${DOMAIN}`);

const Chat: React.FC = () => {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState<{ message: string; name: string }[]>([]);
  const chatLogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.on("message", ({ name, message }) => {
      setChat((prevState) => [...prevState, { name, message }]);
      (chatLogRef.current as HTMLDivElement).scrollTop = (
        chatLogRef.current as HTMLDivElement
      ).scrollHeight;
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, message } = state;

    socket.emit("message", { name, message });

    setState({ message: "", name });
  };

  return (
    <form onSubmit={onMessageSubmit}>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring" }}
        className={styled.container}
      >
        <div className={styled.chatlog} ref={chatLogRef}>
          <p>채팅창에 오신것을 환영합니다</p>
          {chat.map((msg, index) => (
            <div className={styled.message} key={index}>
              <strong>{msg.name} : </strong> {msg.message}
            </div>
          ))}
        </div>
        <div className={styled.inputbox}>
          <input
            type="text"
            placeholder="이름을 입력해주세요."
            name="name"
            onChange={onTextChange}
            value={state.name}
          />
          <input
            type="text"
            placeholder="내용을 입력해주세요."
            name="message"
            className={styled.content}
            onChange={onTextChange}
            value={state.message}
          />
          <button type="submit" onClick={onMessageSubmit}>
            OK
          </button>
        </div>
      </motion.div>
    </form>
  );
};

export default Chat;

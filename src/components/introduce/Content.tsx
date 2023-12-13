import React from "react";
import styled from "./Content.module.scss";
import Img1 from "../../img/writepage.png";
import Img2 from "../../img/boardpage.png";
import Img3 from "../../img/detailpage.png";
import { motion, useScroll, useTransform } from "framer-motion";

const Content: React.FC = () => {
  const { scrollY } = useScroll();
  const firPageY = useTransform(scrollY, [700, 1800], [500, 0]);
  const firOpacityY = useTransform(scrollY, [700, 1800], [0, 1]);
  const firScaleY = useTransform(scrollY, [700, 1800], [0.5, 1]);

  const secOpacityY = useTransform(scrollY, [1800, 2800], [0, 1]);
  const secPageY = useTransform(scrollY, [1800, 2800], [500, 0]);
  const secScaleY = useTransform(scrollY, [1800, 2800], [0.5, 1]);

  return (
    <div className={styled.container}>
      <motion.div
        style={{ opacity: firOpacityY, y: firPageY, scale: firScaleY }}
      >
        <h1>UI 소개</h1>
        <div className={styled.box}>
          <img src={Img1} alt="img" />
          <img src={Img2} alt="img" />
          <img src={Img3} alt="img" />
        </div>
      </motion.div>
      <motion.div
        style={{ opacity: secOpacityY, y: secPageY, scale: secScaleY }}
        className={styled.content}
      >
        <h1>기능들을 소개합니다</h1>
        <div className={styled.line}></div>
        <div className={styled.content_box}>
          <div>
            <h2>글을 작성해보세요</h2>
            <p>
              작성 할 때는 BOARD / BOOK 카테고리를 확인하고 작성을 시작해주세요.
              제목, 이름, 이미지, 내용을 반드시 작성해야합니다.
            </p>
          </div>
          <div className={styled.boxline}></div>
          <div>
            <h2>글을 읽어보세요</h2>
            <p>
              글을 읽어볼 수 있습니다. 글을 제목과 이름 날짜가 표기되는 부분을
              누르게 되면 글을 자세히 볼 수 있습니다.
            </p>
          </div>
          <div className={styled.boxline}></div>
          <div>
            <h2>댓글을 작성해보세요</h2>
            <p>
              자세히 보기를 눌러 들어온 뒤, 댓글 창에 댓글을 쓰고 등록 / 취소를
              할 수 있습니다. 한번 쓴 댓글은 지울 수 없으니 주의 해 주세요.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Content;

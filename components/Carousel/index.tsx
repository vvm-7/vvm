import { NextPage } from "next";
import Card from "../Card/index";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { useEffect, useState } from "react";
import type {
  ApiDataType,
  GameData,
  Games,
  CarouselData,
} from "../../lib/types";
import styles from "./index.module.scss";

const Carousel: NextPage<CarouselData> = (props) => {
  const [backBtn, setBackBtn] = useState<boolean>(false);
  const [forwBtn, setForwBtn] = useState<boolean>(true);
  const [totalWidth, setTotalWidth] = useState<number>(0);

  useEffect(() => {
    const box = document.querySelector("#" + props.carouselId);
    const cardWidth = 330;
    const numberOfCards = props.cardData.length;
    if (box) {
      const onScreenCarouselWidth = box?.clientWidth;
      const visibleCards = onScreenCarouselWidth / cardWidth;
      setTotalWidth(cardWidth * numberOfCards);
      // console.log("Cards " + numberOfCards + " Visible " + visibleCards);
      // console.log(
      //   "onScreenWidth " + onScreenCarouselWidth + " totalWidth " + totalWidth
      // );
      onScreenCarouselWidth < totalWidth ? setForwBtn(true) : setForwBtn(false);
    }
  }, [totalWidth]);

  const backwardClick = () => {
    const box = document.querySelector("#" + props.carouselId);
    if (box) {
      box.scrollLeft = box.scrollLeft - 600;
      box.scrollLeft <= 0 ? setBackBtn(false) : setForwBtn(true);
    }
    // console.log(box?.clientWidth + " " + box?.scrollLeft);
  };

  const forwardClick = () => {
    const box = document.querySelector("#" + props.carouselId);
    if (box) {
      box.scrollLeft = box.scrollLeft + 600;
      box.scrollLeft + box?.clientWidth >= totalWidth
        ? setForwBtn(false)
        : setBackBtn(true);
      // console.log(box?.scrollLeft + box?.clientWidth + " " + totalWidth);
    }
  };

  return (
    <div className={styles.container}>
      {backBtn && (
        <button className={styles.backward} onClick={backwardClick}>
          <MdOutlineArrowBackIosNew />
        </button>
      )}
      {forwBtn && (
        <button className={styles.forward} onClick={forwardClick}>
          <MdArrowForwardIos />
        </button>
      )}
      <div id={props.carouselId} className={styles.cards_container}>
        {props.cardData.map((card, index) => {
          return (
            <Card
              key={index}
              imageSource={card.imageSource}
              gameTitle={card.gameTitle}
              gameInfoPageLink={`/info/game_${card.gameId + 1000}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;

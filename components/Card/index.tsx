import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.scss";

export type CardData = {
  gameTitle: string;
  imageSource: string;
  gameInfoPageLink: string;
};

const Card: NextPage<CardData> = (props) => {
  return (
    <>
      {props?.gameInfoPageLink && (
        <Link href={props?.gameInfoPageLink}>
          <a className={styles.container}>
            <span className={styles.image_container}>
              <Image src={props?.imageSource} layout="fill" objectFit="cover" />
            </span>
            <span className={styles.card_title}>{props?.gameTitle}</span>
          </a>
        </Link>
      )}
    </>
  );
};

export default Card;

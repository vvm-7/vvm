import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { BsPlayCircleFill } from "react-icons/bs";
import styles from "./index.module.scss";

type VideoCardType = {
  key: number;
  index: number;
  bannerSource: string;
  videoLinkSource: string;
};

const VideoCard: NextPage<VideoCardType> = ({
  index,
  bannerSource,
  videoLinkSource,
}) => {
  const redirect = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className={styles.container}>
      <span
        className={styles.play_me}
        onClick={() => redirect(videoLinkSource)}
      >
        <Image src={bannerSource} width={268} height={201} objectFit="cover" />
      </span>
      <div className={styles.content}>
        <div className={styles.title_container}>
          <BsPlayCircleFill
            className={styles.title_button}
            onClick={() => redirect(videoLinkSource)}
          />
          <div className={styles.title}>Part {index + 1}</div>
        </div>
        <div className={styles.description}>
          Press the card to play the video
        </div>
      </div>
    </div>
  );
};

export default VideoCard;

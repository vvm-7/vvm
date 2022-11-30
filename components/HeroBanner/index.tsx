import { NextPage } from "next";
import Image from "next/image";
import Typewriter, { TypewriterClass } from "typewriter-effect";

import styles from "./index.module.scss";

type HeroBannerProps = {
  isMainBanner: boolean;
  bannerSource: string;
  bannerTitle?: string;
};

const HeroBanner: NextPage<HeroBannerProps> = ({
  isMainBanner,
  bannerTitle,
  bannerSource,
}) => {
  const title = bannerTitle;

  return (
    <>
      {isMainBanner && (
        <div className={styles.container_main}>
          <span className={styles.banner_container_main}>
            <Image
              src={bannerSource}
              layout="fill"
              objectFit="cover"
              priority
            />
          </span>

          <div className={styles.content_main}>
            <div className={`${styles.row_main} ${styles.right}`}>
              <span className={styles.tagline_main}>
                NEW VIDEOS UP EVERY SUNDAY
              </span>
            </div>
            <div className={styles.row_main}>
              <span className={styles.logo_container_main}>
                <Image
                  src="/logo.png"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </span>
              <span className={styles.logo_text_main}>
                VENOM&apos;s VADE MECUM
              </span>
            </div>
            <div className={`${styles.row_main} ${styles.right}`}>
              <span className={styles.follow_main}>venom_vade_mecum</span>
            </div>
          </div>
        </div>
      )}

      {isMainBanner === false && (
        <div className={styles.container_gameInfo}>
          <div className={styles.content_gameInfo}>
            <span className={styles.text_gameInfo}>{title}</span>
            <span className={styles.youtube_handle_gameInfo}>
              <Typewriter
                options={{
                  loop: true,
                  delay: 130,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("venom_vade_mecum")
                    .pauseFor(1000)
                    .pauseFor(300)
                    .deleteChars(10)
                    .start();
                }}
              />
            </span>
          </div>

          <div className={styles.banner_container_gameInfo}>
            <Image
              src={bannerSource}
              layout="fill"
              objectFit="cover"
              priority={true}
              // placeholder="blur"
              // blurDataURL="data:image/png;base64,[IMAGE_CODE_FROM_PNG_PIXEL]"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeroBanner;

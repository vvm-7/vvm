import { NextPage } from "next";
import Carousel from "../Carousel";
import type { CarouselData } from "../../lib/types";
import styles from "./index.module.scss";

type HomeDataProps = {
  homeData: CarouselData[];
};

const Home: NextPage<HomeDataProps> = ({ homeData }) => {
  return (
    <>
      {homeData?.length > 0 && (
        <div className={styles.container}>
          <div className={styles.content}>
            {homeData?.map((carouselData, idx) => {
              return (
                <div key={idx}>
                  <h3 className={styles.heading}>{carouselData.carouselId}</h3>
                  <Carousel
                    carouselId={carouselData.carouselId}
                    cardData={carouselData.cardData}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;

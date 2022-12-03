import Head from "next/head";
import Custom404 from "../../components/404";
import Footer from "../../components/Footer";
import HeroBanner from "../../components/HeroBanner";
import Header from "../../components/Header";
import VideoCard from "../../components/VideoCard";
import ComingSoon from "../../components/ComingSoon";
import { useState } from "react";
import { baseApi_address } from "../../lib/constants/constant";
import type { Games } from "../../lib/types";
import styles from "./index.module.scss";

const Info = ({ data }: { data: Games }) => {
  let dataPresent: boolean = false;
  const gameData = data?.gameData || {};
  const [searchText, setSearchText] = useState<string>("");

  if (data?.gameData) {
    dataPresent = true;
  }

  return (
    <>
      <Head>
        <title>Venom&apos;s Vade Mecum</title>
        <meta
          name="description"
          content="A simple guide for hundreds of games where you can find every solution to your gaming problem"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {dataPresent && (
        <>
          <Header
            pageName="Game"
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <div className={"container_main"}>
            <HeroBanner
              isMainBanner={false}
              bannerSource={data?.imageSource ? data?.imageSource : ""}
              bannerTitle={data?.gameTitle ? data?.gameTitle : ""}
            />
            {gameData?.videoData?.length > 0 ? (
              <>
                <div className={styles.container}>
                  <div className={styles.video_count}>
                    Walkthrough ({gameData?.videoData?.length})
                  </div>

                  <div className={styles.video_switcher}>
                    {gameData?.videoData?.map(
                      (videoLinkSource: string, index: number) => {
                        return (
                          <VideoCard
                            key={index}
                            index={index}
                            videoLinkSource={videoLinkSource}
                            bannerSource={
                              gameData?.bannerSource
                                ? gameData?.bannerSource
                                : ""
                            }
                          />
                        );
                      }
                    )}
                  </div>
                </div>
                <Footer calledFrom="info" />
              </>
            ) : (
              <ComingSoon
                heading="Stay Tuned !!!"
                desc=" Sorry for delay. Videos will soon be uploaded for this game on the
              youtube channel. Till that time please bear with us."
              />
            )}
          </div>
        </>
      )}
      {dataPresent === false && <Custom404 />}
    </>
  );
};

export const getStaticPaths = async () => {
  let paths = [];
  for (let i = 1000; i < 1020; i++) {
    paths.push({ params: { gameLink: `game_${i}` } });
  }

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps = async (context: any) => {
  const gameLink: string = context.params.gameLink;
  const gameId = parseInt(gameLink.substring(5)) - 1000;
  let data: Games | {} = {};

  try {
    const res = await fetch(`${baseApi_address}/game/${gameId}`, {
      // const res = await fetch(`${localhost_address}/game/${gameId}`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });
    data = await res?.json();
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      data: data,
    },
  };
};

export default Info;

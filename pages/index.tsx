import Head from "next/head";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import Header from "../components/Header";
import Home from "../components/Home";
import { data } from "../lib/mockAPI/homePageMock";
import { CarouselData, Games } from "../lib/types";
import { GENRE, baseApi_address } from "../lib/constants/constant";

const Main = ({ data }: { data: Games[] }) => {
  const Ongoing: Games[] = [],
    Action: Games[] = [],
    Racing: Games[] = [],
    StayTuned: Games[] = [],
    tempData: CarouselData[] = [],
    [homeData, setHomeData] = useState<CarouselData[]>([]);

  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    if (
      Ongoing.length == 0 &&
      Action.length == 0 &&
      Racing.length == 0 &&
      StayTuned.length == 0 &&
      data?.length > 0
    ) {
      for (let curData of data) {
        for (let cardGenre of curData.genre) {
          switch (cardGenre) {
            case GENRE.Ongoing:
              Ongoing.push(curData);
              break;
            case GENRE.Action:
              Action.push(curData);
              break;
            case GENRE.Racing:
              Racing.push(curData);
              break;
            case GENRE.StayTuned:
              StayTuned.push(curData);
              break;
          }
        }
      }

      if (Ongoing.length > 0)
        tempData.push({ carouselId: GENRE.Ongoing, cardData: Ongoing });
      if (Action.length > 0)
        tempData.push({ carouselId: GENRE.Action, cardData: Action.reverse() });
      if (Racing.length > 0)
        tempData.push({ carouselId: GENRE.Racing, cardData: Racing });
      if (StayTuned.length > 0)
        tempData.push({ carouselId: GENRE.StayTuned, cardData: StayTuned });

      setHomeData(tempData);
    }
  }, [data]);

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

      <Header
        pageName="Home"
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <HeroBanner isMainBanner={true} bannerSource="/banner.png" />
      <Home homeData={homeData} />

      <Footer calledFrom="home" />
    </>
  );
};

export const getStaticProps = async () => {
  let data: CarouselData[] = [];
  const res = await fetch(`${baseApi_address}/game/`, {
    // const res = await fetch(`${localhost_address}/game`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).catch((err) => {
    //console.log(err.response.data);
  });
  data = await res?.json();

  return {
    props: {
      data: data,
    },
  };
};

export default Main;

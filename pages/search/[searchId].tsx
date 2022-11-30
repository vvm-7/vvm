import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import ComingSoon from "../../components/ComingSoon";
import Header from "../../components/Header";
import {
  baseApi_address,
  localhost_address,
} from "../../lib/constants/constant";
import { Games } from "../../lib/types";
import styles from "./index.module.scss";

const SearchResult = () => {
  const { query } = useRouter();
  const { searchId } = query;
  const [searchText, setSearchText] = useState<string>("");
  const [fetchedData, setFetchedData] = useState<Games[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${baseApi_address}/search/${query.searchId}`, {
        // const res = await fetch(`${localhost_address}/search/${query.searchId}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        // headers: headers,
        redirect: "follow",
        referrerPolicy: "no-referrer",
      });
      const data = await res?.json();
      setFetchedData(data);
    })();
    //How it works????
    // {
    //   console.log(searchText);
    //   console.log(fetchedData);
    // }
    return () => {};
  }, [searchId]);

  return (
    <div className={styles.container}>
      <Header
        pageName="Search"
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {fetchedData?.length > 0 ? (
        <>
          <div className={styles.heading}>
            Search Result ({fetchedData?.length})
          </div>
          <div className={styles.cards_container}>
            {fetchedData?.map((card, index) => {
              return (
                <div className={styles.card}>
                  <Card
                    key={index}
                    imageSource={card.imageSource}
                    gameTitle={card.gameTitle}
                    gameInfoPageLink={`/info/game_${card.gameId + 1000}`}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className={styles.coming_soon_container}>
          <ComingSoon
            heading="NO DATA FOUND"
            desc="Please search for other games. No videos are uploaded for the content you are searching"
          />
        </div>
      )}
    </div>
  );
};

export default SearchResult;

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import ComingSoon from "../../components/ComingSoon";
import Header from "../../components/Header";
import {
  baseApi_address_https,
  localhost_address_https,
} from "../../lib/constants/constant";
import { Games } from "../../lib/types";
import styles from "./index.module.scss";

const SearchResult = () => {
  const { query } = useRouter();
  const { searchId } = query;
  const [searchText, setSearchText] = useState<string>("");
  const [fetchedData, setFetchedData] = useState<Games[]>([]);

  useEffect(() => {
    searchId &&
      (async () => {
        const res = await fetch(
          `${baseApi_address_https}/search/${query.searchId}`,
          //`${localhost_address_https}/search/${query.searchId}`,
          {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            redirect: "follow",
            referrerPolicy: "no-referrer",
          }
        ).catch(() => {});
        const data = await res?.json();
        setFetchedData(data);
      })();
    //How it works????{console.log(searchText);console.log(fetchedData);}
    return () => {};
  }, [searchId]);

  return (
    <div className={styles.container}>
      <Header
        pageName="Search"
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {fetchedData?.length > 0 &&
        (fetchedData[0].gameId == -777 ? (
          <div className={styles.coming_soon_container}>
            <ComingSoon
              heading="NO DATA FOUND"
              desc="Please search for other games. No videos are uploaded for the content you are searching"
            />
          </div>
        ) : (
          <>
            <div className={styles.heading}>
              Search Result ({fetchedData?.length})
            </div>
            <div className={styles.cards_container}>
              {fetchedData?.map((card, index) => {
                return (
                  <div key={index} className={styles.card}>
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
        ))}
    </div>
  );
};

export default SearchResult;

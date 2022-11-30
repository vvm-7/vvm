import { NextPage } from "next";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { BiSearchAlt } from "react-icons/bi";
import styles from "./index.module.scss";
import { Dispatch, SetStateAction } from "react";

type HeaderProp = {
  pageName: string;
  searchText: string;
  setSearchText: (arg: string) => void;
};

const Header: NextPage<HeaderProp> = ({
  pageName,
  searchText,
  setSearchText,
}) => {
  const openSearch = async () => {
    //await showSearchResult();
    const newWindow = window.open(
      `/search/${searchText}`,
      "_self",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu_items}>
        <Link href="/">
          <a>
            <img className={styles.logo} src="/assets/logo.png" />
          </a>
        </Link>
        {pageName !== "Home" && (
          <span className={`${styles.link} ${styles.active}`}>{pageName}</span>
        )}
        <Link href="/">
          <a
            className={`${styles.link} ${
              pageName === "Home" ? styles.active : ""
            }`}
          >
            Home
          </a>
        </Link>

        <a className={styles.link} href="https://rishi-mishra.netlify.app/">
          About
        </a>
      </div>
      <div className={styles.form_container}>
        <input
          className={styles.form}
          type="text"
          placeholder="Search Here"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        <BiSearchAlt className={styles.form_button} onClick={openSearch} />
      </div>
    </div>
  );
};

export default Header;

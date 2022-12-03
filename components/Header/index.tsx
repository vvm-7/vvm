import { NextPage } from "next";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { BiSearchAlt } from "react-icons/bi";
import styles from "./index.module.scss";
import { Dispatch, SetStateAction, useState } from "react";

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
  const [mobileSearchForm, setMobileSearchForm] = useState(false);
  const openSearch = () => {
    if (searchText !== "") {
      const newWindow = window.open(
        `/search/${searchText}`,
        "_self",
        "noopener,noreferrer"
      );
      if (newWindow) newWindow.opener = null;
      setMobileSearchForm(false);
    } else if (mobileSearchForm == false) {
      setMobileSearchForm(true);
    } else if (searchText === "" && mobileSearchForm == true) {
      setMobileSearchForm(false);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.menu_items} ${
          mobileSearchForm ? styles.hide_visibility : styles.show_visibility
        }`}
      >
        <Link href="/">
          <a
            className={` ${
              mobileSearchForm ? styles.display_none : styles.display_flex
            }`}
          >
            <img className={styles.logo} src="/assets/logo.png" />
          </a>
        </Link>

        {pageName !== "Home" && (
          <span
            className={`${styles.link} ${styles.active} ${
              mobileSearchForm ? styles.display_none : styles.display_flex
            }`}
          >
            {pageName}
          </span>
        )}

        <Link href="/">
          <a
            className={`${styles.link} ${
              pageName === "Home" ? styles.active : ""
            } ${mobileSearchForm ? styles.display_none : styles.display_flex}`}
          >
            Home
          </a>
        </Link>

        <a
          className={`${styles.link} ${
            mobileSearchForm ? styles.display_none : styles.display_flex
          }`}
          href="https://rishi-mishra.netlify.app/"
        >
          About
        </a>
      </div>
      <div className={styles.form_container}>
        <input
          className={`${styles.search_form} ${
            mobileSearchForm ? styles.show_visibility : styles.hide_visibility
          }
          ${mobileSearchForm ? styles.display_flex : styles.display_none}`}
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

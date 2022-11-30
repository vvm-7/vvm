import { NextPage } from "next";
import Image from "next/image";
import HorizontalRule from "../HorizontalRule";
import { FaTwitter, FaEnvelope, FaInstagram, FaYoutube } from "react-icons/fa";
import styles from "./index.module.scss";

const Footer = ({ calledFrom }: { calledFrom: string }) => {
  return (
    <div
      className={`${styles.container} ${
        calledFrom === "home" ? styles.padding_home_page : ""
      }`}
    >
      <HorizontalRule />
      <div className={styles.row_container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <span className={styles.footer_heading}>Youtube</span>
            <div className={styles.info_container}>
              <a
                className={styles.anchor}
                href="https://www.youtube.com/channel/UCWcQuLYAVIt_VTe3oCrT4PQ"
              >
                <FaYoutube className={styles.logo} />
              </a>
            </div>
          </div>

          <div className={styles.col}>
            <span className={styles.footer_heading}>Sponsored By</span>
            <div className={styles.info_container}>
              <a
                className={styles.anchor}
                href="https://rishi-mishra.netlify.app"
              >
                <Image src="/port.svg" width="40" height="40" />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <span className={styles.footer_heading}>Contact</span>
            <div className={styles.info_container}>
              <a
                className={styles.anchor}
                href="mailto:games.mecum@gmail.com?subject=Contact"
              >
                <FaEnvelope className={styles.logo} />
              </a>
            </div>
          </div>
          <div className={styles.col}>
            <span className={styles.footer_heading}>Associated Links</span>
            <div className={styles.info_container}>
              <a className={`${styles.anchor} ${styles.right_margin}`}>
                <FaInstagram className={styles.logo} />
              </a>
              <a className={styles.anchor}>
                <FaTwitter className={styles.logo} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <HorizontalRule />
      <div className={styles.row}>
        <p className={styles.text}>
          Copyright &copy; 2022 All rights reserved | R.M.
        </p>
      </div>
      <HorizontalRule />
    </div>
  );
};

export default Footer;

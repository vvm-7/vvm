import { NextPage } from "next";
import styles from "./index.module.scss";

const ComingSoon = ({ heading, desc }: { heading: string; desc: string }) => {
  return (
    <div className={styles.container}>
      <span className={styles.heading}>{heading}</span>
      <span className={styles.desc}>{desc}</span>
    </div>
  );
};

export default ComingSoon;

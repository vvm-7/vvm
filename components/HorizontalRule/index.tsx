import { NextPage } from "next";
import styles from "./index.module.scss";

const HorizontalRule: NextPage = () => {
  return <hr className={styles.hr} />;
};

export default HorizontalRule;

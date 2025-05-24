import styles from '../styles/navbar.module.css'
import React from "react";

export default function Navigation(){
  return (
    <div className={styles.navigation}>
      <div className={styles.items}>
        <div className={styles["text-wrapper"]}>Page</div>

        <div className={styles["text-wrapper"]}>Page</div>

        <div className={styles["text-wrapper"]}>Page</div>

        <button className={styles.button}>
          <div className={styles.div}>Button</div>
        </button>
      </div>

      <div className={styles["text-wrapper-2"]}>Site name</div>
    </div>
  );
};

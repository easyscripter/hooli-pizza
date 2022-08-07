import React from "react";
import styles from "./NotFoundInfoBlock.module.scss";

const NotFoundBlock = () => (
    <div className={styles.root}>
        <h1>
            <span>😕</span>
            <br />
            Ничего не найдено
        </h1>
        <p className={styles.description}>В данный момент страница отсутствует на нашем сайте</p>
    </div>
)

export default NotFoundBlock;
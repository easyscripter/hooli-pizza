import React from "react";
import styles from './pagination.module.scss';

export const Pagination = ({prevPage, nextPage, setPage, page = 0, totalPages = 0, }) => {

    return (
        <div className={styles.pagination}>
            <button onClick={prevPage} className={styles.page}>
                &lt;
            </button>
            {[...Array(totalPages).keys()].map((el) => (
                <button
                    onClick={() => setPage(el + 1)}
                    key={el}
                    className={`${styles.page} ${page === el + 1 ? styles.active : ``}`}
                >
                    {el + 1}
                </button>
            ))}
            <button onClick={nextPage} className={styles.page}>
                &gt;
            </button>
        </div>
    )
}

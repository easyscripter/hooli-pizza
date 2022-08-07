import React from "react";


const usePagination = ({contentPerPage, count}) => {
    const [page, setPage] = React.useState(1);
    const pageCount = Math.ceil(count / contentPerPage);
    const lastContentIndex = page * contentPerPage;
    const firstContentIndex = lastContentIndex - contentPerPage;

    const changePage = (direction) => {
        setPage((prevState) => {
            if (direction) {
                if (prevState === pageCount) {
                    return prevState;
                }
                return prevState + 1;
            } else {
                if (prevState === 1) {
                    return prevState;
                }
                return prevState - 1;

            }
        });
    }

    const setPageSafe = (num) => {
        if (num > pageCount) {
            setPage(pageCount);
        } else if (num < 1) {
            setPage(1);
        } else {
            setPage(num);
        }
    }

    return {
        totalPages: pageCount,
        nextPage: () => changePage(true),
        prevPage: () => changePage(false),
        setPage: setPageSafe,
        firstContentIndex,
        lastContentIndex,
        page
    }
}

export default usePagination;

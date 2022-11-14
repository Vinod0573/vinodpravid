import React, { useEffect, useImperativeHandle, useState } from "react";

import styles from "./Pagination.module.scss";

import { props } from "./types";
import ReactPaginate from "react-paginate";

import {
  moveLeftIcon,
  moveRightIcon,
  leftSingleArrow,
  rightSingleArrow,
} from "../../../theme/assets/svg";

const NewPagination = React.forwardRef((props: props, ref: any) => {
  //const [ pageCount, setPageCount] = useState();

  const [current, setCurrentPage] = useState(0);
  const [forcePage, setForcePage] = useState<number | undefined>(props.getPage);
  useImperativeHandle(ref, () => ({
    resetCurrentPage: () => {
      setCurrentPage(0);
      console.log("nithin");
    },
  }));

  useEffect(() => {
    setForcePage(props.getPage);
  }, [props.getPage]);

  function jump(i: number) {
    let newPage = current + i;
    if (newPage >= props.totalNoOfPage) {
      newPage = props.totalNoOfPage - 1;
      return;
    } else if (newPage < 0) {
      newPage = 0;
      return;
    }
    setCurrentPage(newPage);
    setForcePage(newPage);
    props.handlePageChange(newPage + 1);
  }
  const handlePageClick = (e: any) => {
    const tempPage = e.selected;
    setCurrentPage(tempPage);
    props.handlePageChange(tempPage + 1);
  };

  return (
    <div className={styles.wrapper}>
      <img
        onClick={() => {
          jump(-3);
        }}
        src={moveLeftIcon}
      ></img>
      <ReactPaginate
        previousLabel={<img src={leftSingleArrow} alt="<" />}
        nextLabel={<img src={rightSingleArrow} alt=">" />}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={props.totalNoOfPage}
        marginPagesDisplayed={props.marginPagesDisplayed || 1}
        pageRangeDisplayed={props.pageRangeDisplayed || 3}
        onPageChange={handlePageClick}
        containerClassName={styles.pagination}
        //subContainerClassName={`${styles.pages} ${styles.pagination}`}
        activeClassName={styles.active}
        forcePage={forcePage}
      />
      <img
        onClick={() => {
          jump(+3);
        }}
        src={moveRightIcon}
      ></img>
    </div>
  );
});
NewPagination.displayName = "NewPagination";
export default NewPagination;

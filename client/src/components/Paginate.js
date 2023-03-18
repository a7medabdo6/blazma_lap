import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Modal, Pagination } from "react-bootstrap";

function PaginatedItems({ oncustomClick, pageCount }) {
  // We start with an empty list of items.
  const [numbersOfPages, setnumbersOfPages] = useState([]);
  const [active, setactive] = useState(0);

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const renderPagi = () => {
    var arrayOfPages = [];
    for (var i = 0; i < pageCount; i++) {
      arrayOfPages.push(i);
    }
    console.log(arrayOfPages, "arrayOfPages");
    setnumbersOfPages(arrayOfPages);
  };
  useEffect(() => {
    console.log(pageCount, "page");
    renderPagi();
  }, [pageCount]);

  return (
    <>
      {numbersOfPages.length == 1 ? (
        ""
      ) : (
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          {numbersOfPages.map((item) => {
            return (
              <Pagination.Item
                active={active == item ? true : false}
                onClick={() => {
                  setactive(item);
                  oncustomClick(item);
                }}
              >
                {item}
              </Pagination.Item>
            );
          })}

          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      )}
    </>
  );
}

export default PaginatedItems;

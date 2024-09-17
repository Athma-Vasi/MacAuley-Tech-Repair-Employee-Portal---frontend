import { Pagination } from "@mantine/core";
import type React from "react";
import { type CSSProperties, type Dispatch, useEffect, useState } from "react";

type PageBuilderProps = {
  style?: CSSProperties;
  setPageQueryString?: "setPageQueryString";
  parentComponentDispatch?: Dispatch<{
    type: "setPageQueryString";
    payload: string;
  }>;

  setModalPage?: "setModalPage";
  modalPageDispatch?: Dispatch<{
    type: "setModalPage";
    payload: number;
  }>;

  resetPage?: boolean;
  // total = pages from server response
  total: number;
};

function PageBuilder({
  style = {},
  total,
  setPageQueryString = "setPageQueryString",
  parentComponentDispatch,
  resetPage = false,
  setModalPage = "setModalPage",
  modalPageDispatch,
}: PageBuilderProps): React.JSX.Element {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (parentComponentDispatch) {
      parentComponentDispatch({
        type: setPageQueryString,
        payload: `&page=${page}`,
      });
    }

    if (modalPageDispatch) {
      modalPageDispatch({
        type: setModalPage,
        payload: page,
      });
    }
  }, [
    page,
    setPageQueryString,
    parentComponentDispatch,
    modalPageDispatch,
    setModalPage,
  ]);

  useEffect(() => {
    if (resetPage) {
      setPage(1);
    }
  }, [resetPage]);

  return (
    <Pagination
      size="sm"
      value={page}
      onChange={setPage}
      total={total}
      style={{ ...style }}
    />
  );
}

export { PageBuilder };

import { Flex, Pagination } from '@mantine/core';
import { CSSProperties, useEffect, useState } from 'react';

import { useGlobalState } from '../../hooks';

type PageBuilderProps = {
  style?: CSSProperties;
  setPageQueryString?: 'setPageQueryString';
  parentComponentDispatch?: React.Dispatch<{
    type: 'setPageQueryString';
    payload: string;
  }>;

  setModalPage?: 'setModalPage';
  modalPageDispatch?: React.Dispatch<{
    type: 'setModalPage';
    payload: number;
  }>;

  resetPage?: boolean;
  // total = pages from server response
  total: number;
};

function PageBuilder({
  style = {},
  total,
  setPageQueryString = 'setPageQueryString',
  parentComponentDispatch,
  resetPage = false,
  setModalPage = 'setModalPage',
  modalPageDispatch,
}: PageBuilderProps): JSX.Element {
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log('page', page);
  }, [page]);

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
    <Flex
      w="100%"
      align="center"
      justify="center"
      // p={padding}
      // style={{ border: '1px solid #e0e0e0', borderRadius: '4px' }}
    >
      <Pagination
        size="sm"
        value={page}
        onChange={setPage}
        total={total}
        style={{
          ...style,
        }}
      />
    </Flex>
  );
}

export { PageBuilder };

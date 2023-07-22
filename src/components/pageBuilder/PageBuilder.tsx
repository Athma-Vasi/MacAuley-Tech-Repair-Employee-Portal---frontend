import { Flex, Pagination } from '@mantine/core';
import { CSSProperties, useEffect, useState } from 'react';

import { useGlobalState } from '../../hooks';

type PageBuilderProps = {
  style?: CSSProperties;
  setPageQueryString: 'setPageQueryString';
  parentComponentDispatch: React.Dispatch<{
    type: 'setPageQueryString';
    payload: string;
  }>;
  total: number;
};

function PageBuilder({
  style = {},
  total,
  setPageQueryString,
  parentComponentDispatch,
}: PageBuilderProps): JSX.Element {
  const {
    globalState: { padding },
  } = useGlobalState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    parentComponentDispatch({
      type: setPageQueryString,
      payload: `&page=${page}`,
    });
  }, [page, setPageQueryString, parentComponentDispatch]);

  return (
    <Flex w="100%" align="center" justify="center" p={padding}>
      <Pagination
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

import { Pagination } from '@mantine/core';
import jwtDecode from 'jwt-decode';
import { CSSProperties, useEffect, useState } from 'react';

import { authAction } from '../../context/authProvider';
import { useAuth } from '../../hooks';
import { DecodedToken } from '../login/types';

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

  const {
    authDispatch,
    authState: { accessToken },
  } = useAuth();

  // check access token validity on every page change
  useEffect(() => {
    const decodedToken: DecodedToken = jwtDecode(accessToken);
    const { exp: accessTokenExpiration, iat: accessTokenIssuedAt } =
      decodedToken;
    const isAccessTokenExpired = accessTokenExpiration * 1000 < Date.now();

    if (isAccessTokenExpired) {
      authDispatch({
        type: authAction.setIsAccessTokenExpired,
        payload: isAccessTokenExpired,
      });
    }
  }, [authDispatch, page]);

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

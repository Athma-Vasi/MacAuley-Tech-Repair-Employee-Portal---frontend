import { Pagination, Stack, Text } from "@mantine/core";
import React, { useEffect } from "react";

import { LimitPerPage } from "../resource/types";

type PageNavigationProps<ValidValueAction extends string = string> = {
  limitPerPage: LimitPerPage;
  parentDispatch: React.Dispatch<{
    action: ValidValueAction;
    payload: number;
  }>;
  totalPages: number;
  validValueAction: ValidValueAction;
};

function PageNavigation<ValidValueAction extends string = string>({
  limitPerPage,
  parentDispatch,
  totalPages,
  validValueAction,
}: PageNavigationProps<ValidValueAction>): React.JSX.Element {
  const [page, setPage] = React.useState(() => 1);

  console.group("PageNavigation");
  console.log("page", page);
  console.log("totalPages", totalPages);
  console.groupEnd();

  useEffect(() => {
    parentDispatch({
      action: validValueAction,
      payload: page,
    });
  }, [page, parentDispatch, validValueAction]);

  return (
    <Stack>
      <Text>Page Navigation</Text>
      <Pagination onChange={setPage} total={totalPages} value={page} />
    </Stack>
  );
}

export { PageNavigation };

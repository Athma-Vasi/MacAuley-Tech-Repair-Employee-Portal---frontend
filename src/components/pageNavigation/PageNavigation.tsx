import { Pagination, Stack } from "@mantine/core";
import React, { useEffect } from "react";

type PageNavigationProps<ValidValueAction extends string = string> = {
  disabled?: boolean;
  parentDispatch: React.Dispatch<{
    action: ValidValueAction;
    payload: string;
  }>;
  totalPages: number;
  validValueAction: ValidValueAction;
};

function PageNavigation<ValidValueAction extends string = string>({
  disabled = false,
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
      payload: page.toString(),
    });
  }, [page, parentDispatch, validValueAction]);

  return (
    <Stack>
      <Pagination
        disabled={disabled}
        onChange={setPage}
        total={totalPages}
        value={page}
      />
    </Stack>
  );
}

export { PageNavigation };

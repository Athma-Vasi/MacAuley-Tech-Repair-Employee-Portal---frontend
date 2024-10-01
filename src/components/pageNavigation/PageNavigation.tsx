import { Pagination, Stack } from "@mantine/core";
import type React from "react";
import { useState } from "react";

type PageNavigationProps<ValidValueAction extends string = string> = {
  currentPage: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  parentDispatch: React.Dispatch<{
    action: ValidValueAction;
    payload: string;
  }>;
  totalPages: number;
  validValueAction: ValidValueAction;
};

function PageNavigation<ValidValueAction extends string = string>(
  {
    currentPage,
    disabled = false,
    onChange,
    parentDispatch,
    totalPages,
    validValueAction,
  }: PageNavigationProps<ValidValueAction>,
): React.JSX.Element {
  const [page, setPage] = useState(currentPage);

  return (
    <Stack>
      <Pagination
        disabled={disabled}
        onChange={(value: number) => {
          setPage(value);
          parentDispatch({
            action: validValueAction,
            payload: value.toString(),
          });

          onChange?.(value);
        }}
        total={totalPages}
        value={page}
      />
    </Stack>
  );
}

export { PageNavigation };

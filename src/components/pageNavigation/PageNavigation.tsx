import { Pagination } from "@mantine/core";
import React from "react";

type PageNavigationProps<ValidValueAction extends string = string> = {
  parentDispatch: React.Dispatch<{
    action: ValidValueAction;
    payload: number;
  }>;
  totalPages: number;
  validValueAction: ValidValueAction;
  value: number;
};

function PageNavigation<ValidValueAction extends string = string>({
  parentDispatch,
  totalPages,
  validValueAction,
  value,
}: PageNavigationProps<ValidValueAction>): React.JSX.Element {
  return (
    <Pagination
      total={totalPages}
      value={value}
      onChange={(value: number) => {
        parentDispatch({
          action: validValueAction,
          payload: value,
        });
      }}
    />
  );
}

export { PageNavigation };

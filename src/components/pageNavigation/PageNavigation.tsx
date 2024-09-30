import { Pagination, Stack } from "@mantine/core";
import type React from "react";

type PageNavigationProps<ValidValueAction extends string = string> = {
  currentPage: number;
  disabled?: boolean;
  onChangeCallbacks?: Array<() => void>;
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
    onChangeCallbacks = [],
    parentDispatch,
    totalPages,
    validValueAction,
  }: PageNavigationProps<ValidValueAction>,
): React.JSX.Element {
  return (
    <Stack>
      <Pagination
        disabled={disabled}
        onChange={(value: number) => {
          parentDispatch({
            action: validValueAction,
            payload: value.toString(),
          });

          onChangeCallbacks.forEach((callback) => {
            callback?.();
          });
        }}
        total={totalPages}
        value={currentPage}
      />
    </Stack>
  );
}

export { PageNavigation };

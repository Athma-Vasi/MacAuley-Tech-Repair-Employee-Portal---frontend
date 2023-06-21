type CustomErrorProps = {
  isError: boolean;
  ref?:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined;
  message: string;
  link?:
    | {
        address: string;
        text: string;
      }
    | undefined;
  closeErrorCallback?: () => void | undefined;
};

export type { CustomErrorProps };

type SuccessProps = {
  isSuccessful: boolean;
  ref?:
    | ((instance: HTMLDivElement | null) => void)
    | React.RefObject<HTMLDivElement>
    | null
    | undefined;
  link?:
    | {
        address: string;
        text: string;
      }
    | undefined;
  message: string;
  closeSuccessCallback?: () => void | undefined;
};

export type { SuccessProps };

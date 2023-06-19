type LogoutResponse = {
  message: string;
};

type PortalHeaderProps = {
  openedHeader: boolean;
  setOpenedHeader: React.Dispatch<React.SetStateAction<boolean>>;
};

export type { LogoutResponse, PortalHeaderProps };

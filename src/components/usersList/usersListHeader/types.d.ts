import { UsersListAction, UsersListDispatch, UsersListState } from '../types';

type UsersListHeaderProps = {
  heading: string;
  usersListState: UsersListState;
  usersListDispatch: React.Dispatch<UsersListDispatch>;
  usersListAction: UsersListAction;
};

export { UsersListHeaderProps };

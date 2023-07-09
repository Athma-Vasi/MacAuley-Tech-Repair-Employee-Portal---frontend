import type { User } from '../../../types';
import type {
  UsersListAction,
  UsersListDispatch,
  UsersListState,
} from '../types';

type UsersListDesktopProps = {
  transformedUsers: User[];
  openUserEdit: () => void;
  usersListState: UsersListState;
  usersListAction: UsersListAction;
  usersListDispatch: React.Dispatch<UsersListDispatch>;
};

export type { UsersListDesktopProps };

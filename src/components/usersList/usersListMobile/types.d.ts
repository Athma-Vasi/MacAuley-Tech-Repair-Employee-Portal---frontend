import {
  UsersListAction,
  UsersListDispatch,
  UsersListState,
  UsersListSortKey,
} from '../types';
import type { User } from '../../../types';

type UsersListMobileProps = {
  transformedUsers: User[];
  openUserEdit: () => void;
  usersListState: UsersListState;
  usersListAction: UsersListAction;
  usersListDispatch: React.Dispatch<UsersListDispatch>;
};

type UserHeadingSelectData = {
  value: UsersListSortKey;
  label: Capitalize<UsersListSortKey>;
};

type UserDirectionSelectData = {
  value: 'asc' | 'desc';
  label: 'Ascending' | 'Descending';
};

export type {
  UsersListMobileProps,
  UserHeadingSelectData,
  UserDirectionSelectData,
};

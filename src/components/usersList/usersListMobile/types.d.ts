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

type HeadingSelectDataProps = {
  value: UsersListSortKey;
  label: Capitalize<UsersListSortKey>;
};

type DirectionSelectDataProps = {
  value: 'asc' | 'desc';
  label: 'Ascending' | 'Descending';
};

export type {
  UsersListMobileProps,
  HeadingSelectDataProps,
  DirectionSelectDataProps,
};

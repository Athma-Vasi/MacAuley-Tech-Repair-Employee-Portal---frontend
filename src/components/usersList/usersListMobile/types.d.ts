import type { User } from '../../../types';
import {
  UsersListAction,
  UsersListDispatch,
  UsersListSortKey,
  UsersListState,
} from '../types';

type UsersListMobileProps = {
  transformedUsers: User[];
  openUserEdit: () => void;
  usersListState: UsersListState;
  usersListAction: UsersListAction;
  usersListDispatch: React.Dispatch<UsersListDispatch>;
};

type UsersListMobileState = Record<string, boolean>;

type UsersListMobileAction = {
  setCollapseToggle: 'setCollapseToggle';
};

type UsersListMobilePayload = {
  id: string;
  data: boolean;
};

type UsersListMobileDispatch = {
  type: UsersListMobileAction[keyof UsersListMobileAction];
  payload: UsersListMobilePayload;
};

type UsersListMobileReducer = (
  state: UsersListMobileState,
  action: UsersListMobileDispatch
) => UsersListMobileState;

type UserHeadingSelectData = {
  value: UsersListSortKey;
  label: Capitalize<UsersListSortKey>;
};

type UserDirectionSelectData = {
  value: 'asc' | 'desc';
  label: 'Ascending' | 'Descending';
};

export type {
  UserDirectionSelectData,
  UserHeadingSelectData,
  UsersListMobileAction,
  UsersListMobileDispatch,
  UsersListMobilePayload,
  UsersListMobileProps,
  UsersListMobileReducer,
  UsersListMobileState,
};

import { User, UsersListSortKey, UsersListSort } from './types';

function sortUsersByKey({
  users,
  sortKey,
  sortDirection,
}: {
  users: User[];
  sortKey: UsersListSortKey;
  sortDirection: UsersListSort;
}) {
  const clonedUsers = structuredClone(users);

  return clonedUsers.sort((a: User, b: User) => {
    if (sortKey === 'username') {
      return sortDirection === 'asc'
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username);
    } else if (sortKey === 'email') {
      return sortDirection === 'asc'
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    } else if (sortKey === 'roles') {
      return sortDirection === 'desc'
        ? a.roles.includes('Manager') || a.roles.includes('Admin')
          ? -1
          : 1
        : b.roles.includes('Manager') || b.roles.includes('Admin')
        ? -1
        : 1;
    } else if (sortKey === 'active') {
      return sortDirection === 'asc'
        ? a.active === b.active
          ? 0
          : a.active
          ? -1
          : 1
        : a.active === b.active
        ? 0
        : a.active
        ? 1
        : -1;
    } else if (sortKey === 'created') {
      return sortDirection === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortKey === 'updated') {
      return sortDirection === 'asc'
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else {
      return 0;
    }
  });
}

export { sortUsersByKey };

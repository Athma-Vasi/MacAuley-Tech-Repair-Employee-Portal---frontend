import { User, SortUsersByKeyProps } from './types';

function sortUsersByKey({
  users,
  sortKey,
  sortDirection,
}: SortUsersByKeyProps) {
  const clonedUsers = structuredClone(users);

  return clonedUsers.sort((a: User, b: User) => {
    if (sortKey === 'username') {
      return sortDirection === 'asc'
        ? a.username.localeCompare(b.username)
        : sortDirection === 'desc'
        ? b.username.localeCompare(a.username)
        : 0;
    } else if (sortKey === 'email') {
      return sortDirection === 'asc'
        ? a.email.localeCompare(b.email)
        : sortDirection === 'desc'
        ? b.email.localeCompare(a.email)
        : 0;
    } else if (sortKey === 'roles') {
      return sortDirection === 'desc'
        ? a.roles.includes('Manager') || a.roles.includes('Admin')
          ? -1
          : 1
        : sortDirection === 'asc'
        ? b.roles.includes('Manager') || b.roles.includes('Admin')
          ? -1
          : 1
        : 0;
    } else if (sortKey === 'active') {
      return sortDirection === 'asc'
        ? a.active === b.active
          ? 0
          : a.active
          ? -1
          : 1
        : sortDirection === 'desc'
        ? a.active === b.active
          ? 0
          : a.active
          ? 1
          : -1
        : 0;
    } else if (sortKey === 'created') {
      return sortDirection === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : sortDirection === 'desc'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : 0;
    } else if (sortKey === 'updated') {
      return sortDirection === 'asc'
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        : sortDirection === 'desc'
        ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        : 0;
    } else {
      return 0;
    }
  });
}

export { sortUsersByKey };

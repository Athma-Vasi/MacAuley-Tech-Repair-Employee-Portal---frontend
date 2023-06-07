import { ReactNode } from 'react';

type UsersListProps = {
  children?: ReactNode;
};

function UsersList({ children }: UsersListProps): JSX.Element {
  return <h1>Users List</h1>;
}

export { UsersList };

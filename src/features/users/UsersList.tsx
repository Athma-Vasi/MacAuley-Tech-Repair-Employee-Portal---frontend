import { ReactNode, useEffect, useReducer } from 'react';
import { User } from './User';
import {
  UserReturn,
  fetchUsersReducer,
  initialState,
  fetchUserAction,
} from './UserReducer';
import axios from 'axios';

type UsersListProps = {
  children?: ReactNode;
};

function UsersList({ children }: UsersListProps): JSX.Element {
  const [fetchUsersState, fetchUsersDispatch] = useReducer(
    fetchUsersReducer,
    initialState
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const controller = new AbortController();
      const { signal } = controller;

      const url = 'http://localhost:3500/users';

      try {
        const { data } = await axios.get<UserReturn[]>(url, { signal });

        fetchUsersDispatch({
          type: fetchUserAction.FETCH_USERS_SUCCESS,
          payload: {
            users: data,
            isLoading: false,
            error: '',
            isSuccess: true,
          },
        });

        return () => controller.abort();
      } catch (error: any) {
        if (error.name === 'AbortError') {
          fetchUsersDispatch({
            type: fetchUserAction.FETCH_USERS_FAILURE,
            payload: {
              users: [],
              isLoading: false,
              error: error.message ?? 'Fetching users aborted',
              isSuccess: false,
            },
          });
        } else {
          fetchUsersDispatch({
            type: fetchUserAction.FETCH_USERS_FAILURE,
            payload: {
              users: [],
              isLoading: false,
              error: error.message ?? 'Error fetching users',
              isSuccess: false,
            },
          });
        }
      }
    };

    fetchUsers();
  }, []);

  const { users, isLoading, error, isSuccess } = fetchUsersState;

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error !== '') {
    content = <p className={error ? 'errmsg' : 'offscreen'}>{error}</p>;
  }

  if (isSuccess) {
    const tableContent = users?.length ? (
      users.map((user: UserReturn) => <User key={user._id} user={user} />)
    ) : (
      <tr>
        <td colSpan={3}>No users found</td>
      </tr>
    );

    content = (
      <table className="table table--users">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Username
            </th>
            <th scope="col" className="table__th user__roles">
              Roles
            </th>
            <th scope="col" className="table__th user__edit">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return (
    content ?? (
      <div>You are seeing this because content was somehow undefined</div>
    )
  );
}

export { UsersList };

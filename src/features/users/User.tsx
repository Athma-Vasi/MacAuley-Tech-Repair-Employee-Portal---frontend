import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  FetchUserAction,
  UserDispatch,
  UserReturn,
  UserState,
} from './UserReducer';

type UserProps = {
  children?: ReactNode;
  user: UserReturn;
};

function User({ children, user }: UserProps): JSX.Element | null {
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dash/users/${user._id}`);

    const userRolesString = user.roles.toString().replaceAll(',', ', ');

    const cellStatus = user.active ? '' : 'table__cell--inactive';

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button
            className="icon-button table__button"
            type="button"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
}

export { User };

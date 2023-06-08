import { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

import { ROLES } from '../../config/roles';
import {
  addUserAction,
  addUserReducer,
  initialAddUserState,
} from './usersState/addUser';

import type { AddUserReturn } from './usersState/addUser';
import axios from 'axios';

const USER_REGEX = /^[a-zA-Z]{3,20}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/;

function NewUserForm() {
  const [addUserState, addUserDispatch] = useReducer(
    addUserReducer,
    initialAddUserState
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (addUserState.isSuccess) {
      addUserDispatch({
        type: addUserAction.ADD_USER_RESET,
        payload: {
          userInfo: {
            username: '',
            password: '',
            roles: [ROLES.Employee],
          },
          error: '',
          isLoading: false,
          isValidPassword: false,
          isValidUsername: false,
          isSuccess: false,
        },
      });

      navigate('/dash/users');
    }
  }, [addUserState.isSuccess, navigate]);

  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const username = event.currentTarget.value;
    addUserDispatch({
      type: addUserAction.ADD_USER_USERNAME,
      payload: {
        ...addUserState,
        userInfo: {
          ...addUserState.userInfo,
          username,
        },
      },
    });

    const isValidUsername = USER_REGEX.test(username);
    addUserDispatch({
      type: addUserAction.ADD_USER_IS_VALID_USERNAME,
      payload: {
        ...addUserState,
        isValidUsername,
      },
    });
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    const password = event.currentTarget.value;
    addUserDispatch({
      type: addUserAction.ADD_USER_PASSWORD,
      payload: {
        ...addUserState,
        userInfo: {
          ...addUserState.userInfo,
          password,
        },
      },
    });

    const isValidPassword = PASSWORD_REGEX.test(password);
    addUserDispatch({
      type: addUserAction.ADD_USER_IS_VALID_PASSWORD,
      payload: {
        ...addUserState,
        isValidPassword,
      },
    });
  }

  function handleRolesChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const roles = Array.from(
      event.currentTarget.selectedOptions,
      (option) => option.value
    ) as ('Admin' | 'Employee' | 'Manager')[];

    addUserDispatch({
      type: addUserAction.ADD_USER_ROLES,
      payload: {
        ...addUserState,
        userInfo: {
          ...addUserState.userInfo,
          roles,
        },
      },
    });
  }

  async function handleOnSaveUserSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (addUserState.isValidUsername && addUserState.isValidPassword) {
      const url = 'http://localhost:3500/users';

      const controller = new AbortController();
      const { signal } = controller;

      const { data } = await axios.post<AddUserReturn>(
        url,
        JSON.stringify(addUserState.userInfo),
        { signal }
      );

      if (
        data.message ===
        `User ${addUserState.userInfo.username} created successfully`
      ) {
        addUserDispatch({
          type: addUserAction.ADD_USER_SUCCESS,
          payload: {
            ...addUserState,
            error: '',
            isLoading: false,
            isSuccess: true,
          },
        });

        controller.abort();
      } else {
        addUserDispatch({
          type: addUserAction.ADD_USER_FAILURE,
          payload: {
            ...addUserState,
            error: data.message,
            isLoading: false,
            isSuccess: false,
          },
        });

        controller.abort();
      }
    }
  }

  const options = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

  const errClass = addUserState.error ? 'errmsg' : 'offscreen';
  const validUserClass = addUserState.isValidUsername
    ? ''
    : 'form__input--incomplete';
  const validPasswordClass = addUserState.isValidPassword
    ? ''
    : 'form__input--incomplete';
  const canSave = addUserState.isValidUsername && addUserState.isValidPassword;

  const content = (
    <>
      <p className={errClass}>{addUserState.error}</p>

      <form className="form" onSubmit={handleOnSaveUserSubmit}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              type="submit"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={addUserState.userInfo.username}
          onChange={handleUsernameChange}
          minLength={3}
          maxLength={20}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[8-32 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPasswordClass}`}
          id="password"
          name="password"
          type="password"
          value={addUserState.userInfo.password}
          onChange={handlePasswordChange}
          minLength={8}
          maxLength={32}
        />

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className="form__select"
          multiple={true}
          size={3}
          value={addUserState.userInfo.roles}
          onChange={handleRolesChange}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
}

export { NewUserForm };

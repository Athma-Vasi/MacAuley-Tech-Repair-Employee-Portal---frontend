import { ReactNode } from 'react';

type LoginProps = {
  children?: ReactNode;
};

function Login({ children }: LoginProps): JSX.Element {
  return <h1>Login</h1>;
}

export { Login };

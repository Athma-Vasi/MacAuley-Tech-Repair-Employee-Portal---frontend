import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type WelcomeProps = {
  children?: ReactNode;
};

function Welcome({ children }: WelcomeProps): JSX.Element {
  const currDate = new Date();
  const now = new Intl.DateTimeFormat('en-us', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(currDate);

  const content = (
    <section className="welcome">
      <p>{now}</p>

      <h1>Welcome!</h1>

      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>

      <p>
        <Link to="/dash/users">View User Settings</Link>
      </p>
    </section>
  );

  return content;
}

export { Welcome };

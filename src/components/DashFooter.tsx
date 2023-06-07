import { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

type DashFooterProps = {
  children?: ReactNode;
};

function DashFooter({ children }: DashFooterProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleOnGoHomeClick = () => navigate('/dash');

  let goHomeButton = null as JSX.Element | null;
  // only show the go home button if we are not on the home page
  if (pathname !== '/dash') {
    goHomeButton = (
      <button
        className="dash-footer__button icon-button"
        type="button"
        title="Home"
        onClick={handleOnGoHomeClick}
      >
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current User: </p>
      <p>Status: </p>
    </footer>
  );

  return content;
}

export { DashFooter };

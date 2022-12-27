import LogoImg from './Logo.png';
import styles from './index.module.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Logo = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    // don't navigate to homepage if user is already there
    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  };

  return (
    <img onClick={handleClick} className={`${styles.logo} ${props.className}`} src={LogoImg} alt="" draggable="false" />
  );
};

export default Logo;

import ImgNotFound from './not_found.jpg';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { Button } from 'rsuite';

const NotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.container}>
      <img src={ImgNotFound} alt="img" draggable="false" />
      <Button appearance="primary" size="lg" onClick={handleRedirect}>
        Return to homepage
      </Button>
    </div>
  );
};

export default NotFound;

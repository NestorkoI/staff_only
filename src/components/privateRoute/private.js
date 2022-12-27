import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import { Navigate } from 'react-router-dom';

const Private = (props) => {
  const value = useContext(UserContext);

  if (value.user) {
    return props.children;
  } else {
    return <Navigate to="/" replace={true} />;
  }
};

export default Private;

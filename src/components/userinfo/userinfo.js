import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext';
import style from './style.module.css';

export const Userinfo = () => {
  const value = useContext(UserContext);

  return (
    <div className={style.container}>
      <div className={style.nikName}>
        <div>
          <div className={style.userName}> {value.user.displayName} </div>
          <div className={style.userPosition}> {value.details.position} </div>
        </div>
        <img src={value.details.avatar} alt="" draggable="false" />
      </div>
    </div>
  );
};

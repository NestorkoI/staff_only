import style from './style.module.css';

const Opponentinfouser = (props) => {
  return (
    <div className={style.container}>
      <img src={props.user.avatar} alt="img" draggable="false" />
      <div className={style.userContainer}>
        <div className={style.userName}>{props.user.displayName}</div>
        <div className={style.userPosition}>{props.user.position}</div>
      </div>
    </div>
  );
};

export default Opponentinfouser;

import style from './style.module.css';

export const Profileuser = (props) => {
  return (
    <div className={`${style.container} ${props.active ? style.active : ''}`} onClick={() => props.onClick(props.user)}>
      <img src={props.user.avatar} alt="" draggable="false" />
      <div className={style.info}>
        <div>{props.user.displayName}</div>
        <div>{props.user.position}</div>
      </div>
    </div>
  );
};

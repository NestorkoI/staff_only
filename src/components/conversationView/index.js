import style from './style.module.css';

const ConversationView = (props) => {
  return (
    <div className={style.container}>
      <div className={style.patternWrapper}>
        <div className={style.relativeContainer}>
          <div className={style.childrenWrapper}>{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;

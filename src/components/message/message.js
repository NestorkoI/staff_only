import style from './style.module.css';
import { useEffect, useRef } from 'react';

const Message = (props) => {
  const { message } = props;

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div ref={ref} style={{ alignSelf: props.align }} className={style.container}>
      <div className={style.avatar}>
        <img src={message.avatar} alt="img" draggable="false" />
      </div>
      <div className={style.message}>{message.text}</div>
    </div>
  );
};

export default Message;

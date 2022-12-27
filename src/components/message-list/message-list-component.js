import style from './style.module.css';
import { useSelector } from 'react-redux';
import { selectMessages } from './message-list-reducer';
import Message from '../../components/message/message';

const Messagelist = (props) => {
  const messages = useSelector(selectMessages); // messages []

  return (
    <div className={style.container}>
      {messages.map((m) => {
        return <Message key={m.id} align={m.uid === props.user.uid ? 'end' : 'start'} message={m} />;
      })}
    </div>
  );
};

export default Messagelist;

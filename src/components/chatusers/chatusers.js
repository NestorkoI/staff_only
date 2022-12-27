import style from './style.module.css';
import { Message } from 'rsuite';

import { Profileuser } from '../profileuser/profileuser';

export const UsersList = (props) => {
  return (
    <div className={style.container}>
      {props?.users.length === 0 && <Message showIcon>No users available to chat with, at the moment</Message>}
      {props.users
        .filter((user) => user.uid !== props.selfUser.uid)
        .map((user) => {
          return (
            <Profileuser
              active={user.uid === props.oponnent?.uid}
              key={user.uid}
              user={user}
              onClick={props.onUserSelect}
            />
          );
        })}
    </div>
  );
};

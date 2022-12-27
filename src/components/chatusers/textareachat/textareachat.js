import { useState } from 'react';
import { Input } from 'rsuite';
import style from './style.module.css';
import { Button } from 'rsuite';

const Textareachat = (props) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    props.onMessageSend(text);
    setText('');
  };

  const handleTextChange = (value) => {
    setText(value);
  };

  return (
    <div className={style.container}>
      <div className={style.inputField}>
        <Input value={text} onChange={handleTextChange} as="textarea" rows={3} placeholder="Text a message.." />
      </div>
      <div className={style.action}>
        <Button appearance="subtle" size="sm" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Textareachat;

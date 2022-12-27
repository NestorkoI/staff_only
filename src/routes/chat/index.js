import { useContext, useState, useEffect } from 'react';
import { Button } from 'rsuite';
import { Sidebar } from '../../components/sidebar/sidebar';
import { UsersList } from '../../components/chatusers/chatusers';
import { Userinfo } from '../../components/userinfo/userinfo';
import styles from './styles.module.css';
import ConversationView from '../../components/conversationView';
import Opponentinfouser from '../../components/chatusers/opponentinfouser/opponentinfouser';
import Messagelist from '../../components/message-list/message-list-component';
import Textareachat from '../../components/chatusers/textareachat/textareachat';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserContext } from '../../contexts/userContext';
import { ChatContext } from '../../contexts/chatContext';

const Chat = () => {
  const [userList, setUserList] = useState([]);
  const { logOut, user } = useContext(UserContext);
  const { oponnent, setOponnent, addChatMessage } = useContext(ChatContext);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, 'users'));

      const tempUserList = [];
      querySnapshot.forEach((doc) => {
        tempUserList.push(doc.data());
      });

      setUserList(tempUserList);
    }

    fetchData();
  }, []);

  const handleUserClick = (userObj) => {
    setOponnent(userObj);
  };

  const handleSinout = () => {
    logOut();
  };

  const handleNewMessage = (value) => {
    addChatMessage(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebarContainer}>
        <Sidebar>
          <UsersList selfUser={user} users={userList} oponnent={oponnent} onUserSelect={handleUserClick} />
          <div className={styles.sidebarFooter}>
            <Userinfo />
            <Button appearance="primary" size="sm" onClick={handleSinout}>
              Sign Out
            </Button>
          </div>
        </Sidebar>
      </div>
      <ConversationView>
        {oponnent ? (
          <>
            <Opponentinfouser user={oponnent} />
            <Messagelist user={user} />
            <Textareachat onMessageSend={handleNewMessage} />
          </>
        ) : (
          <div className={styles.emptyChatMessage}>
            <div>Please select a user to start messaging</div>
          </div>
        )}
      </ConversationView>
    </div>
  );
};

export default Chat;

import { createContext, useState, useContext, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { UserContext } from '../contexts/userContext';
import { v4 as uuidv4 } from 'uuid';
import { updateAllMessages } from '../components/message-list/message-list-reducer';

export const ChatContext = createContext();

const mergeIDs = (a, b) => {
  if (a > b) {
    return `${a}${b}`;
  } else {
    return `${b}${a}`;
  }
};

export const ChatProvider = (props) => {
  const dispatch = useDispatch();
  const { user, details } = useContext(UserContext);
  const [oponnent, setOponnent] = useState();

  useEffect(() => {
    if (!oponnent || !user) {
      return;
    }

    const unsub = onSnapshot(doc(db, 'chats', mergeIDs(user.uid, oponnent.uid)), (doc) => {
      dispatch(updateAllMessages(typeof doc.data() === 'undefined' ? [] : doc.data().messages));
    });

    return () => {
      unsub();
    };
  }, [dispatch, oponnent, user]);

  const addChatMessage = async (value) => {
    const mergedIDs = mergeIDs(user.uid, oponnent.uid);
    const documentRef = doc(db, 'chats', mergedIDs);

    const snapshot = await getDoc(documentRef);

    const newMessage = {
      text: value,
      avatar: details.avatar,
      uid: user.uid,
      id: uuidv4(),
    };

    if (snapshot.exists()) {
      await updateDoc(doc(db, 'chats', mergedIDs), {
        messages: arrayUnion(newMessage),
      });
    } else {
      await setDoc(doc(db, 'chats', mergedIDs), { messages: [newMessage] });
    }
  };

  const value = {
    setOponnent,
    oponnent,
    addChatMessage,
  };

  return <ChatContext.Provider value={value}>{props.children}</ChatContext.Provider>;
};

import { createContext, useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import Loading from '../components/loading';

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = useState();
  const [details, setDetails] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser();
        setIsReady(true);
      }
    });
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const documentRef = doc(db, 'users', user.uid);

    getDoc(documentRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();

          setDetails({ position: data.position, avatar: data.avatar });

          setIsReady(true);
        } else {
          // doc.data() will be undefined in this case
        }
      })
      .catch((error) => {});
  }, [user]);

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser();
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const value = {
    user: user,
    details: details,
    signUp: signUp,
    logIn: logIn,
    logOut: logOut,
    setUserDetails: setDetails,
  };

  return <UserContext.Provider value={value}>{isReady ? props.children : <Loading />}</UserContext.Provider>;
}

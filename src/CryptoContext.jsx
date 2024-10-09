import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth,db } from "./firebase";  
import {  doc,onSnapshot } from "firebase/firestore";

const Crypto = createContext();

const CryptoProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ watchlist,setWatchlist ] = useState();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribeAuth();  
  }, []);

  useEffect(() => {
    if (user) {
      const watchlistRef = doc(db, 'watchlist', user.uid);
      const unsubscribeWatchlist = onSnapshot(watchlistRef, (doc) => {
        if (doc.exists()) {
          setWatchlist(doc.data().coins || []);
        } else {
          setWatchlist([]); 
        }
      });

      return () => unsubscribeWatchlist(); 
    } else {
      setWatchlist([]); 
    }
  }, [user]);

  return (
    <Crypto.Provider
      value={{
        user,
        watchlist,
        setWatchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoProvider;


export const CryptoState = () => useContext(Crypto);

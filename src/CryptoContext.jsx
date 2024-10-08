import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth,db } from "./firebase";  // Ensure you have the correct path
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

    return () => unsubscribeAuth();  // Clean up Auth state listener
  }, []);

  useEffect(() => {
    if (user) {
      const watchlistRef = doc(db, 'watchlist', user.uid);
      const unsubscribeWatchlist = onSnapshot(watchlistRef, (doc) => {
        if (doc.exists()) {
          setWatchlist(doc.data().coins || []);
        } else {
          setWatchlist([]); // If no watchlist exists, initialize as empty
        }
      });

      return () => unsubscribeWatchlist(); // Clean up Firestore listener
    } else {
      setWatchlist([]); // Clear watchlist if no user
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

// Custom hook for using CryptoContext easily
export const CryptoState = () => useContext(Crypto);

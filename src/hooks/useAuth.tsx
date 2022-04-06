import { User, getAuth, onAuthStateChanged, Auth } from "firebase/auth";
import { useState, useEffect, useRef } from "react";

interface UseAuth {
  user: User | null;
  auth: Auth;
}

const useAuth = (): UseAuth => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  let mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && mounted.current) {
        setUser(user);
      } else if (!user && mounted.current) {
        setUser(null);
      }
    });

    return () => {
      mounted.current = false;
      unsubscribe();
    };
  }, [auth]);

  return { user, auth };
};

export default useAuth;

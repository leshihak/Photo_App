import { User, getAuth, onAuthStateChanged, Auth } from "firebase/auth";
import { useState, useEffect } from "react";

interface UseAuth {
  user: User | null;
  auth: Auth;
  isLoading: boolean;
}

const useAuth = (): UseAuth => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(true);
      }
    });

    return () => {
      setIsLoading(false);
      unsubscribe();
    };
  }, [auth]);

  return { user, auth, isLoading };
};

export default useAuth;

import { UserType } from "models/user.model";
import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import useUsers from "./useUsers";

const useCurrentUser = (): UserType | null => {
  const { user } = useAuth();
  const users = useUsers();

  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    const currentUser = users.find((_user) => _user.uid === user?.uid)!!;
    setCurrentUser(currentUser);
  }, [users, user]);

  return currentUser;
};

export default useCurrentUser;

import { db } from "config/firebase";
import { ref, onValue } from "firebase/database";
import { DataBaseModel } from "models/service.model";
import { UserType } from "models/user.model";
import { useEffect, useState } from "react";

const useUsers = (): UserType[] => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    onValue(ref(db, DataBaseModel.USERS), (snapshot) => {
      if (snapshot.val()) {
        const result = Object.entries(snapshot.val())?.map(([key, value]) => ({
          ...(value as UserType),
          uid: key,
        }));
        setUsers(result);
      }
    });
  }, []);

  return users;
};

export default useUsers;

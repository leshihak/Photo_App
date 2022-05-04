import { db } from "config/firebase";
import { ref, onValue } from "firebase/database";
import { DataBaseModel } from "models/service.model";
import { UserType } from "models/user.model";
import { useEffect, useState } from "react";
import { FIREBASE_URL, IMAGE_KIT_URL } from "static/constants";

const useUsers = (): UserType[] => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    onValue(ref(db, DataBaseModel.USERS), (snapshot) => {
      if (snapshot.val()) {
        const result = Object.entries(snapshot.val())?.map(([key, value]) => {
          const newUrl = (value as UserType).photoURL?.replace(
            FIREBASE_URL,
            IMAGE_KIT_URL
          )!!;
          return {
            ...(value as UserType),
            uid: key,
            photoURL: newUrl,
          };
        });
        setUsers(result);
      }
    });
  }, []);

  return users;
};

export default useUsers;

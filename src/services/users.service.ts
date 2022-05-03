import { ref, set, update } from "firebase/database";
import { DataBaseModel } from "models/service.model";
import { UserType } from "models/user.model";
import { db } from "./../config/firebase";

export const setUserToDB = (id: string, data: UserType) =>
  set(ref(db, `${DataBaseModel.USERS}/${id}`), data);

export const updateUserInDB = (id: string, values: any) =>
  update(ref(db, `${DataBaseModel.USERS}/${id}`), values);

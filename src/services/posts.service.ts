import { push, ref } from "firebase/database";
import { DataBaseModel } from "models/service.model";
import { db } from "./../config/firebase";
import { v4 as uuidv4 } from "uuid";

export const setPhotoPostToUserToDB = (userId: string, data: any) =>
  push(ref(db, `${DataBaseModel.POSTS}/${userId}/photos`), {
    ...data,
    id: uuidv4(),
  });

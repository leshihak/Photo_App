import { ref, set, update } from "firebase/database";
import { toast } from "react-toastify";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref as reference,
} from "firebase/storage";
import { DataBaseModel } from "models/service.model";
import { UserType } from "models/user.model";
import { db, storage } from "./../config/firebase";

export const setUserToDB = (id: string, data: UserType) =>
  set(ref(db, `${DataBaseModel.USERS}/${id}`), data);

export const updateUserInDB = (id: string, values: any) =>
  update(ref(db, `${DataBaseModel.USERS}/${id}`), values);

export const updateProfilePhotoToStorage = (
  currentUser: UserType | null,
  file: File,
  setModalType: (value: number | null) => void
) => {
  const storageRef = reference(storage, `/profilePhotos/${file.name}`);
  const uploadFile = uploadBytesResumable(storageRef, file);

  uploadFile.on(
    "state_changed",
    null,
    (error) => toast.error(error),
    () => {
      setModalType(null);
      getDownloadURL(uploadFile.snapshot.ref).then((url) => {
        updateUserInDB(currentUser?.uid!!, {
          ...currentUser,
          photoURL: url,
        });
      });
    }
  );
};

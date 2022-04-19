import { ref as reference, push } from "firebase/database";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { DataBaseModel } from "models/service.model";
import { db, storage } from "./../config/firebase";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid";

export const setPhotoPostToUserToDB = (
  userId: string | undefined,
  data: File[] | null,
  setStep: Dispatch<SetStateAction<number>>
) =>
  data?.forEach((file) => {
    const storageRef = ref(storage, `/posts/${file.name}`);
    const uploadFile = uploadBytesResumable(storageRef, file);

    uploadFile.on(
      "state_changed",
      null,
      (error) => toast.error(error),
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((url) => {
          push(reference(db, `${DataBaseModel.POSTS}/${userId}/photos`), {
            id: uuidv4(),
            alt: file.name,
            url,
          });
          return url;
        });
        setStep(4);
      }
    );
  });

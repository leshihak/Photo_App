import { db } from "config/firebase";
import { ref, onValue } from "firebase/database";
import { Post, PostData } from "models/post.model";
import { DataBaseModel } from "models/service.model";
import { useEffect, useState } from "react";
import { FileTypes } from "static/constants";
import useAuth from "./useAuth";

const FIREBASE_URL =
  "https://firebasestorage.googleapis.com/v0/b/photoapp-5b23c.appspot.com/";
const IMAGE_KIT_URL = "https://ik.imagekit.io/spadheuh8/";

const ARRAY_OF_POST_TYPES = [
  FileTypes.PHOTOS,
  FileTypes.VIDEOS,
  FileTypes.SAVED,
];

const usePosts = (): PostData => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<PostData>({
    photos: [],
    videos: [],
    saved: [],
  });

  useEffect(() => {
    ARRAY_OF_POST_TYPES.forEach((post) =>
      onValue(
        ref(db, `${DataBaseModel.POSTS}/${user?.uid}/${post}`),
        (snapshot) => {
          if (snapshot.val()) {
            const result = Object.entries(snapshot.val())?.map(
              ([key, value]) => {
                const newUrl = (value as Post).url.replace(
                  FIREBASE_URL,
                  IMAGE_KIT_URL
                );
                return {
                  ...(value as Post),
                  url: newUrl,
                  uid: key,
                };
              }
            );
            setPosts((prevState) => ({ ...prevState, [post]: result }));
          }
        }
      )
    );
  }, [user]);

  return posts;
};

export default usePosts;

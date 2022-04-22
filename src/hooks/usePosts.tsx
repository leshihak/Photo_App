import { db } from "config/firebase";
import { ref, onValue } from "firebase/database";
import { Post, PostData } from "models/post.model";
import { DataBaseModel } from "models/service.model";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const usePosts = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<PostData>({
    photos: [],
    videos: [],
    saved: [],
  });

  useEffect(() => {
    if (user) {
      onValue(
        ref(db, `${DataBaseModel.POSTS}/${user.uid}/photos`),
        (snapshot) => {
          if (snapshot.val()) {
            const result = Object.entries(snapshot.val())?.map(
              ([key, value]) => ({
                ...(value as Post),
                uid: key,
              })
            );
            setPosts({ ...posts, photos: result });
          }
        }
      );
    }
  }, [posts, user]);

  return posts;
};

export default usePosts;

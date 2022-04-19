import { db } from "config/firebase";
import { ref, onValue } from "firebase/database";
import { DataBaseModel } from "models/service.model";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const usePosts = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<{
    photos: { alt: string; url: string; id: string }[];
    videos: { alt: string; url: string; id: string }[];
    saved: { alt: string; url: string; id: string }[];
  }>({
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
              ([_, value]) => ({
                ...(value as { alt: string; url: string; id: string }),
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

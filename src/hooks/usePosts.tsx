import { db } from "config/firebase";
import { ref, onValue } from "firebase/database";
import { Post, PostData } from "models/post.model";
import { DataBaseModel } from "models/service.model";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const FIREBASE_URL =
  "https://firebasestorage.googleapis.com/v0/b/photoapp-5b23c.appspot.com/";
const IMAGE_KIT_URL = "https://ik.imagekit.io/spadheuh8/";

interface UsePosts {
  posts: PostData;
  isLoadingPosts: boolean;
}

const usePosts = (): UsePosts => {
  const { user } = useAuth();

  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [posts, setPosts] = useState<PostData>({
    images: [],
    videos: [],
    saved: [],
  });

  useEffect(() => {
    if (user) {
      setIsLoadingPosts(true);
      onValue(
        ref(db, `${DataBaseModel.POSTS}/${user.uid}/images`),
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
            setIsLoadingPosts(false);
            setPosts({ ...posts, images: result });
          }
        }
      );
      onValue(
        ref(db, `${DataBaseModel.POSTS}/${user.uid}/videos`),
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
            setIsLoadingPosts(false);
            setPosts({ ...posts, videos: result });
          }
        }
      );
    }
  }, [posts, user]);

  return { posts, isLoadingPosts };
};

export default usePosts;

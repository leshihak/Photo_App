import { db } from "config/firebase";
import { ref, onValue } from "firebase/database";
import { Comment } from "models/post.model";
import { DataBaseModel } from "models/service.model";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

interface UsePostComments {
  comments: Comment[];
  isLoadingComments: boolean;
}

const usePostComments = (postId: string): UsePostComments => {
  const { user } = useAuth();

  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (user) {
      onValue(
        ref(db, `${DataBaseModel.POSTS}/${user.uid}/photos/${postId}/comments`),
        (snapshot) => {
          if (snapshot.val()) {
            const result = Object.entries(snapshot.val())?.map(
              ([key, value]) => ({
                ...(value as Comment),
                uid: key,
              })
            );
            setComments(result.reverse());
          }
          setIsLoadingComments(false);
        }
      );
    }
  }, [postId, user]);

  return { comments, isLoadingComments };
};

export default usePostComments;

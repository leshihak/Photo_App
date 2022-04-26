export interface Comment {
  id: string;
  userId: string;
  text: string;
  isLiked: boolean;
}

export interface Post {
  alt: string;
  url: string;
  uid: string;
  comments: Comment[];
  userIdsWhoLikedPost: [];
  createdAt: number;
}

export interface PostData {
  photos: Post[];
  videos: Post[];
  saved: Post[];
}

export type PostType = "photos" | "saved" | "videos";

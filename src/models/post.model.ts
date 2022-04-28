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
  images: Post[];
  videos: Post[];
  saved: Post[];
}

export type PostType = "images" | "saved" | "videos";

export interface Comment {
  createdAt: number;
  text: string;
  userId: string;
  uid: string;
}

export interface FileItem {
  id: string;
  alt: string;
  url: string;
  type: PostType;
}

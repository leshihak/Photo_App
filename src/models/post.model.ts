export interface PostData {
  [key: string]: {
    alt?: string;
    id: string;
    url: string;
  }[];
}

export type PostType = "images" | "saved" | "videos";

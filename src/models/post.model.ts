export interface PostData {
  photos: { alt: string; url: string; id: string }[];
  videos: { alt: string; url: string; id: string }[];
  saved: { alt: string; url: string; id: string }[];
}

export type PostType = "photos" | "saved" | "videos";

export enum ModalTypes {
  POST_CREATION_MODAL,
  POST_USERS_LIKE_MODAL,
  CHANGE_PROFILE_PHOTO_MODAL,
}

export const FILE_TYPES = {
  video: ["video/mp4", "video/quicktime"],
  image: ["image/jpeg", "image/png", "image/heic", "image/heif"],
};

export enum FileTypes {
  PHOTOS = "photos",
  VIDEOS = "videos",
  SAVED = "saved",
}

export const FIREBASE_URL =
  "https://firebasestorage.googleapis.com/v0/b/photoapp-5b23c.appspot.com/";
export const IMAGE_KIT_URL = "https://ik.imagekit.io/spadheuh8/";

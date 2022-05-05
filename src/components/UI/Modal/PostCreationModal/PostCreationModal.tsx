import { Box } from "@mui/material";
import { FC, useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";
import UploadFileStep from "./UploadFileStep";
import PreviewFilesStep from "./PreviewFilesStep";
import CreatePostStep from "./CreatePostStep";
import useAuth from "hooks/useAuth";
import PostSharingStep from "./PostSharingStep";
import { setPostToUserToDB } from "services/posts.service";
import PostSharedStep from "./PostSharedStep";
import { FileItem } from "models/post.model";
import { FileTypes, FILE_TYPES } from "static/constants";

const PostCreationModal: FC = () => {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[] | null>(null);

  const { user } = useAuth();

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles) {
      return null;
    }
    setStep(1);
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const preparedFiles: FileItem[] = files?.map((file) => ({
    id: `${file.lastModified}-${file.name}`,
    alt: file.name,
    url: URL.createObjectURL(file),
    type: FILE_TYPES.image.includes(file.type)
      ? FileTypes.PHOTOS
      : FileTypes.VIDEOS,
  }))!!;

  return (
    <Box
      minWidth="348px"
      minHeight="391px"
      maxWidth="min(calc(100vw - 372px),855px)"
      width="650px"
      height="745px"
    >
      {step === 0 && (
        <UploadFileStep
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
        />
      )}
      {step === 1 && (
        <PreviewFilesStep onSetStep={setStep} files={preparedFiles} />
      )}
      {step === 2 && (
        <CreatePostStep
          onSetStep={setStep}
          files={preparedFiles}
          user={user}
          onCreatePost={() => setPostToUserToDB(user?.uid, files, setStep)}
        />
      )}
      {step === 3 && <PostSharingStep />}
      {step === 4 && <PostSharedStep />}
    </Box>
  );
};

export default PostCreationModal;

import { Box } from "@mui/material";
import { FC, useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";
import UploadFileStep from "./UploadFileStep";
import PreviewFilesStep from "./PreviewFilesStep";

const PostCreationModal: FC = () => {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<FileList | null>(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles) {
      return null;
    }
    console.log(acceptedFiles);
    setStep(1);
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box maxWidth="855px" minWidth="348px" minHeight="391px" maxHeight="898px">
      {step === 0 && (
        <UploadFileStep
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
        />
      )}
      {step === 1 && <PreviewFilesStep onSetStep={setStep} />}
    </Box>
  );
};

export default PostCreationModal;

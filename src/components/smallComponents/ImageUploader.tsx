import { Flex } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FaUpload } from "react-icons/fa";

interface Props {
  files: File[];
  onSetFiles: (files: File[]) => void;
  w?: string;
  h?: string;
  borderRadius?: string;
}

const ImageUploader = ({ files, onSetFiles, w, h, borderRadius }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onSetFiles([...files, ...acceptedFiles]);
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Flex
      {...getRootProps()}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      h={h || "3xs"}
      w={w || "lg"}
      border={"2px"}
      borderStyle={"dashed"}
      borderRadius={borderRadius || "3xl"}
      borderColor={isDragActive ? "red.300" : "gray.300"}
      bg={isDragActive ? "red.50" : "transparent"}
      textAlign="center"
      cursor="pointer"
    >
      <input {...getInputProps()} />
      <FaUpload />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Upload Images</p>}
    </Flex>
  );
};

export default ImageUploader;

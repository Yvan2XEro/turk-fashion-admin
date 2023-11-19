"use client";

import React, { useEffect } from "react";
import { DropzoneOptions } from "react-dropzone";
import { SingleImageDropzone } from "../SingleImageDropzone";
import { uploadImageToFirebase } from "@/lib/upload";
import { AppLoader } from "../AppLoader";
type InputProps = {
  // width: number;
  // height: number;
  className?: string;
  value?: string;
  onChange?: (file?: string) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
};
function AppImageField(props: InputProps, ref: any) {
  const [value, setValue] = React.useState<File | string | undefined>(
    props.value
  );
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    if (value instanceof File) {
      (async () => {
        setLoading(true);
        const url = await uploadImageToFirebase(value);
        setValue(url);
        setLoading(false);
        props.onChange?.(url);
        console.log("Success!!!");
      })();
    }
  }, [value]);
  return (
    <>
      {!loading ? (
        <SingleImageDropzone
          {...props}
          ref={ref}
          value={value}
          onChange={setValue}
          dropzoneOptions={{
            ...props.dropzoneOptions,
          }}
        />
      ) : (
        <AppLoader />
      )}
    </>
  );
}

export default React.forwardRef<HTMLInputElement, InputProps>(AppImageField);

"use client";

import React, { useEffect } from "react";
import { DropzoneOptions } from "react-dropzone";
import { SingleImageDropzone } from "../SingleImageDropzone";
import { AppLoader } from "../AppLoader";
import { upload } from "@/lib/api/images";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const uploadMutation = useMutation({
    mutationFn: (file: File) => upload(file),
    onSuccess: (data) => {
      props.onChange?.(data.url);
      setValue(data.url);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Unable to upload image",
      });
    },
  });
  const [value, setValue] = React.useState<File | string | undefined>(
    props.value
  );
  useEffect(() => {
    if (value instanceof File) {
      (async () => {
        await uploadMutation.mutateAsync(value);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <>
      {!uploadMutation.isPending ? (
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

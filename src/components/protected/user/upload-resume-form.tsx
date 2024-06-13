"use client";

import { UploadButton } from "@/lib/uploadthing";
import "@react-pdf-viewer/core/lib/styles/index.css";
import React, { useState } from "react";

const UploadResumeForm = ({resumeUrl}:{
  resumeUrl:string | null
}) => {
  const [file, setFile] = useState<string>(resumeUrl as string);

  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      {file && (
        <div className="text-blue-900 w-full h-full">
          <iframe src={file} className="w-full h-full" />
        </div>
      )}
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setFile(res[0].url);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default UploadResumeForm;

import UploadResumeForm from "@/components/protected/user/upload-resume-form";
import { getUser } from "@/lib/get-logged-in-user";
import React from "react";

const UploadPage = async () => {
  const user = await getUser();
  return (
    <div className="w-full max-w-[600px]">
      {user.resumeUrl && <UploadResumeForm resumeUrl={user.resumeUrl}/>}
    </div>
  );
};

export default UploadPage;

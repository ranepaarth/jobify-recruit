"use server";

import { EmailApplicationUpdate } from "@/components/email/email-application-update";
import { transporter } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { UpdateApplicationStatusSchema } from "@/schema/zod-schema";
import { render } from "@react-email/render";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateApplicationStatus = async (
  values: z.infer<typeof UpdateApplicationStatusSchema>,
  jobApplicationId: string
) => {
  const validatedFields = UpdateApplicationStatusSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { status, rejectMessage } = validatedFields.data;

  if (status === "Applied") {
    return {
      error: "Either Accept or Reject the application!",
    };
  }

  if (status === "Rejected" && !rejectMessage) {
    return {
      error: "Provide the reason for rejected the application",
    };
  }

  const jobApplication = await prisma.jobPostUser.findUnique({
    where: {
      id: jobApplicationId,
    },
    include: {
      jobPost: {
        include:{
          postedBy:true
        }
      },
      user: true,
    },
  });

  if (!jobApplication) {
    return {
      error: "This job application does not exist!",
    };
  }

  await prisma.jobPostUser.update({
    where: {
      id: jobApplication.id,
    },
    data: {
      applicationStatus: status,
    },
  });

  const sendApplicationUpdateEmail = render(
    EmailApplicationUpdate({
      applicantName: jobApplication.user.name!,
      jobTitle: jobApplication.jobPost.title,
      status,
      companyName: jobApplication.jobPost.companyName,
      adminEmail: jobApplication.jobPost.postedBy.email,
      reason: rejectMessage,
      liveLink: process.env.LIVE_LINK!,
    })
  );

  try {
    await transporter.sendMail({
      to: [jobApplication.user.email],
      subject: `Jobify Application: ${jobApplication.jobPost.title}`,
      text: "Hello",
      html: sendApplicationUpdateEmail,
    });
    revalidatePath(`/admin/jobs/applicants?jobId=${jobApplication.jobPostId}`);
  } catch (error) {
    console.log(error);
  }
  return {
    success: "Application updated successfully!",
  };
};

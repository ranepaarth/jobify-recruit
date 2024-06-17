"use server";

import { EmailToAdmin } from "@/components/email/email-to-admin";
import { EmailToUser } from "@/components/email/email-to-user";
import { getUserById } from "@/lib/db-users";
import { getUser } from "@/lib/get-logged-in-user";
import { transporter } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { JobApplicationSchema } from "@/schema/zod-schema";
import { render } from "@react-email/render";
import { z } from "zod";

export const applyToJob = async (
  values: z.infer<typeof JobApplicationSchema>
) => {
  const validatedFields = JobApplicationSchema.safeParse(values);

  const user = await getUser();

  if (!validatedFields.success) {
    return {
      error: "Invalid pdf format!",
    };
  }

  const { jobId } = validatedFields.data;

  const applicant = await getUserById(user.id);

  if (!applicant) {
    return {
      error: "Unauthorized access denied!",
    };
  }

  const job = await prisma.jobPost.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    return {
      error: "The job you are applying for does not exist!",
    };
  }

  const hasUserApplied = await prisma.jobPostUser.findUnique({
    where: {
      userId_jobPostId: {
        userId: user.id,
        jobPostId: jobId,
      },
    },
  });

  if (hasUserApplied) {
    return {
      error: "You have already applied to this job!",
    };
  }

  await prisma.jobPostUser.create({
    data: {
      userId: user.id,
      jobPostId: jobId,
    },
  });

  const emailToUser = render(
    EmailToUser({
      job,
      jobLink: `http://localhost:3000/user/all-jobs?jobId=${job.id}`,
      liveLink: process.env.LIVE_LINK!,
    })
  );
  const emailToAdmin = render(
    EmailToAdmin({
      applicant,
      jobTitle: job.title,
      companyName: job.companyName,
      liveLink: process.env.LIVE_LINK!,
    })
  );

  try {
    const info = await transporter.sendMail({
      to: [applicant.email],
      subject: `Jobify Application: ${job.title}`,
      text: "Hello",
      html: emailToUser,
    });

    const adminInfo = await transporter.sendMail({
      to: job.adminEmail,
      subject: `New Application: ${job.title}`,
      text: "Hello",
      html: emailToAdmin,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Admin notification sent: %s", adminInfo.messageId);
  } catch (error) {
    console.log(error);
  }

  return {
    success: "Job Application successful!",
  };
};

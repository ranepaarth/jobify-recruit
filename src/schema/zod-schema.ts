import { z } from "zod";
export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Provide your email address!",
    })
    .email("Provide an email!"),
  password: z
    .string({
      required_error: "Provide a password!",
    })
    .min(4, { message: "Password must be between 4 and 16 characters!" })
    .max(16, {
      message: "Password must be between 4 and 16 characters!",
    }),
});

export const RegisterSchema = z.object({
  name: z
    .string({
      required_error: "Provide you name!",
    })
    .min(4, { message: "Name must be minimum 4 characters long!" }),
  email: z.string().email("Provide an email!"),
  password: z
    .string()
    .min(4, { message: "Password must be between 4 and 16 characters!" })
    .max(16, {
      message: "Password must be between 4 and 16 characters!",
    }),
});

export const CreateCategorySchema = z.object({
  name: z
    .string({
      required_error: "Provide a Job category!",
    })
    .min(4, { message: "Job category must be at least 4 characters long!" }),
});

export const CreateJobPostSchema = z.object({
  companyName: z
    .string({
      required_error: "Company name cannot be empty",
    })
    .min(4, {
      message: "Company name must be at least 4 characters long",
    }),
  title: z
    .string({
      required_error: "Provide a job title",
    })
    .min(1, {
      message: "Provide a job title",
    }),
  companyDesc: z
    .string({
      required_error: "Describe the company in brief",
    })
    .min(4, {
      message: "Describe the company in brief",
    }),
  jobDesc: z
    .string({
      required_error: "Provide more insights about the job",
    })
    .min(4, {
      message: "Provide more insights about the job",
    }),
  category: z.string({
    required_error: "",
  }),
  type: z.string({
    required_error: "Select a Job type",
  }),
  salary: z.string({
    required_error: "",
  }).min(4,{
    message:"Provide the salary for this job"
  }),
  skills: z.string({
    required_error: "",
  }).min(4,{
    message:"Provide relevant skills (Comma seperated)"
  }),
  experience: z.string({
    required_error: "",
  }),
});

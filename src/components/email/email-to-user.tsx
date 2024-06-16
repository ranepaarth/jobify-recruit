import { JobPost } from "@prisma/client";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Text,
} from "@react-email/components";
import React from "react";

type EmailToUserProps = {
  job: JobPost;
  jobLink: string;
};

export const EmailToUser = ({ job, jobLink }: EmailToUserProps) => {
  return (
    <Html lang="en">
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Job Application Confirmation</Heading>
          <Text style={text}>Dear Applicant,</Text>
          <Text style={text}>
            Thank you for applying to the position of
            <Text style={textBold}>{job.title}</Text> at {job.companyName}.
          </Text>
          <Text style={text}>Job Description:</Text>
          <Text style={text}>{job.jobDesc}</Text>
          <Button href={jobLink} style={button}>
            View Job Details
          </Button>
          <Text style={text}>
            We will review your application and get back to you soon.
          </Text>
          <Text style={text}>Best regards,</Text>
          <Text style={text}>{job.companyName} Team</Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  padding: "20px",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const text = {
  fontSize: "16px",
  lineHeight: "1.5",
  marginBottom: "20px",
};

const textBold = {
  fontWeight: "800",
  padding: "0px 10px",
};

const button = {
  backgroundColor: "#007bff",
  color: "#ffffff",
  padding: "10px 20px",
  borderRadius: "5px",
  textDecoration: "none",
  display: "inline-block",
};

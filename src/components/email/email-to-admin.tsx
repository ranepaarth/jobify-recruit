import { User } from "@prisma/client";
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

type EmailToAdminProps = {
  applicant: User;
  jobTitle: string;
  companyName: string;
};

export const EmailToAdmin = ({
  applicant,
  jobTitle,
  companyName,
}: EmailToAdminProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Job Application Received</Heading>
          <Text style={text}>Dear Admin,</Text>
          <Text style={text}>
            {applicant.name} has applied for the position of {jobTitle} at{" "}
            {companyName}.
          </Text>
          <Text style={text}>Applicant Details:</Text>
          <Text style={text}>Name: {applicant.name}</Text>
          <Text style={text}>Email: {applicant.email}</Text>
          <Text style={text}>
            Please review the application and proceed with the next steps.
          </Text>
          <Text style={text}>Best regards,</Text>
          <Text style={text}>{companyName} Team</Text>
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

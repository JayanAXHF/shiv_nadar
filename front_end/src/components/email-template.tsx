import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface PasswordResetEmailProps {
  content: string;
}

export const EmailTemplate = ({ content }: PasswordResetEmailProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http:localhost:3000";

  return (
    <Html>
      <Head />
      <Preview>Reset your password for your account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/favicon.png`}
            width="42"
            height="42"
            alt="Your Company"
            style={logo}
          />
          <Heading style={h1}>Reset your password</Heading>
          <Text style={text}>Hey there!</Text>
          <Text style={text}>
            We received a request to reset your password. If you didn&apos;t
            make this request, you can safely ignore this email.
          </Text>
          <Section style={buttonContainer}>
            <Link style={button} href={content}>
              Reset Password
            </Link>
          </Section>

          <Hr style={hr} />
          <Text style={footer}>
            If you didn't request a password reset, please ignore this
            email.{" "}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailTemplate;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
  padding: "40px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #eee",
  borderRadius: "5px",
  boxShadow: "0 5px 10px rgba(20, 50, 70, 0.2)",
  margin: "0 auto",
  maxWidth: "600px",
  padding: "20px",
};

const logo = {
  margin: "0 auto 20px",
  display: "block",
};

const h1 = {
  color: "#1f2937",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "1.1",
  margin: "0 0 15px",
  textAlign: "center" as const,
};

const text = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "1.4",
  margin: "0 0 15px",
};

const buttonContainer = {
  margin: "25px 0",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#3b82f6",
  borderRadius: "5px",
  color: "#fff",
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "1",
  padding: "12px 20px",
  textAlign: "center" as const,
  textDecoration: "none",
};

const codeContainer = {
  background: "#f3f4f6",
  borderRadius: "5px",
  margin: "16px 0",
  padding: "10px",
  textAlign: "center" as const,
};

const code = {
  color: "#1f2937",
  display: "inline-block",
  fontFamily: "monospace",
  fontSize: "24px",
  fontWeight: "700",
  letterSpacing: "2px",
  margin: "0",
};

const hr = {
  borderColor: "#e5e7eb",
  margin: "20px 0",
};

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "24px",
};

const link = {
  color: "#3b82f6",
  textDecoration: "underline",
};

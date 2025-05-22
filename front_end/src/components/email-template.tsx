import * as React from "react";

interface EmailTemplateProps {
  content: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  content,
}) => (
  <div>
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      Hey there!
    </h1>
    <p className="leading-7 [&:not(:first-child)]:mt-6">{content}</p>
  </div>
);

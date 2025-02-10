import * as React from "react";

interface EmailTemplateProps {
  message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ message }) => (
  <div>{message}</div>
);

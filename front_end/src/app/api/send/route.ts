import { EmailTemplate } from "../../../components/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { to, subject, request } = await req.json();
  try {
    const { data, error } = await resend.emails.send({
      from: "Valtam <valtam@amalgamationmc.xyz>",
      to: [to],
      subject: subject as string,
      react: EmailTemplate({ content: request as string }) as React.ReactNode,
    });

    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.log(error);
    return Response.json({ error }, { status: 500 });
  }
}

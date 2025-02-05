import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

const transport = createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req: Request, res: Response) {
  const { name, email, phone, message } = await req.json();
  const mailOpts: Mail.Options = {
    from: process.env.GMAIL,
    to: process.env.GMAIL,
    html: `<p>Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}</p>`,
    subject:`Message from ${name}`,
  };
  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOpts, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });
  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (e) {
    return NextResponse.json({ message: "Email not sent" });
  }
}

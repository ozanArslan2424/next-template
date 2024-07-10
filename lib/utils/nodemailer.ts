"use server";
var nodemailer = require("nodemailer");
const domain = process.env.NEXT_PUBLIC_URL;

const appName = "Workshop";

type EmailProps =
    | {
          type: "invite";
          email: string;
          token: string;
      }
    | {
          type: "request";
          email: string;
      };

export const sendEmail = (props: EmailProps) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    var mail = {
        to: props.email,
        subject: "",
        text: "",
        html: "",
    };

    if (props.type === "invite") {
        const inviteLink = `${domain}/invited?token=${props.token}`;

        mail = {
            to: props.email,
            subject: `${appName} Invite Link.`,
            text: `Use this link to create your account: ${inviteLink}`,
            html: `
      <div style="text-align: center; margin-top: 24px">
          <h1>Hello!</h1>
          <p>Sign up with your invited email using the link below.</p>
          <a style="margin-top: 24px; font-size: large">${inviteLink}</a>
      </div>
      `,
        };
    }

    if (props.type === "request") {
        mail = {
            to: process.env.EMAIL_USER!,
            subject: `${appName} Davet Talebi.`,
            text: `Bu e-posta adresi ${appName}'a davet kodu istiyor: ${props.email}`,
            html: `
      <div style="text-align: center; margin-top: 24px">
          <h1>Merhaba!</h1>
          <p>Aşağıdaki e-posta adresi ${appName}'a davet kodu istiyor.</p>
          <p>E-posta adresi:</p>
          <p style="margin-top: 24px; font-size: large">${props.email}</p>
      </div>
    `,
        };
    }

    var mailOptions = {
        from: process.env.EMAIL_FROM,
        to: mail.to,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
    };

    transporter.sendMail(mailOptions, function (error: Error, info: any) {
        if (error) {
            throw new Error(error.message);
        } else {
            return true;
        }
    });
};

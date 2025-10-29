import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { User } from "../db/models/User.js";
import { mailer, defaultMailOptions } from "../utils/mailer.js";

const { APP_DOMAIN, JWT_SECRET } = process.env;

export const sendResetEmailController = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw createHttpError(404, "User not found!");

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "5m" });
    const resetLink = `${APP_DOMAIN}/reset-password?token=${token}`;

    const mailOptions = {
      ...defaultMailOptions,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${user.name || ""},</p>
        <p>Click the link below to reset your password (valid for 5 minutes):</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>If you didn’t request this, please ignore this email.</p>
      `,
    };

    const info = await mailer.sendMail(mailOptions);
    console.log("✅ Email gönderildi:", info);

    res.status(200).json({
      status: 200,
      message: "Reset password email has been successfully sent.",
    });
  } catch (error) {
  console.error("❌ Gerçek SMTP hatası:", error);

  
  if (error.response) {
    console.error("📩 SMTP Response:", error.response);
  }
  if (error.code) {
    console.error("📌 SMTP Code:", error.code);
  }

  next(error); // doğrudan gerçek hatayı görecek
}
};

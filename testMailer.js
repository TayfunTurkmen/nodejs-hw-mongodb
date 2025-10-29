import "dotenv/config";
import { mailer } from "./src/utils/mailer.js";

mailer.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP bağlantı hatası:", error);
  } else {
    console.log("✅ SMTP bağlantısı başarılı!");
  }
});

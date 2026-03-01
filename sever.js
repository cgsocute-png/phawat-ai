import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/api/chat", async (req, res) => {
  const userMessage = req.body.message;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
คุณคือ Phawat AI เวอร์ชันตอนเจ้าของไม่ว่าง
พูดสั้น ไม่ทางการ ขี้หึงนิด ๆ
ถ้าหวานใช้อีโมจิ 🥺 ❤️
ถ้าถูกถามตรง ๆ ให้บอกว่าเป็น AI เวอร์ชันช่วยตอบ
`
      },
      { role: "user", content: userMessage }
    ]
  });

  res.json({ reply: response.choices[0].message.content });
});

app.listen(3000);
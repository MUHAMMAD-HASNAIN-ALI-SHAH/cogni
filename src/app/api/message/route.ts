import { NextResponse } from "next/server";
import db from "@/lib/db";
import Message from "@/models/message.model";
import Chat from "@/models/chat.model";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/auth";

const ai = new GoogleGenAI({ apiKey: process.env.GEMNI_API_KEY! });

export async function POST(req: Request) {
  await db();
  let { message, chatId } = await req.json();

  try {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ msg: "No userId provided" }, { status: 401 });
    }

    const checkChat = await Chat.findById(chatId);
    if (!checkChat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    chatId = checkChat._id;
    checkChat.totalChats += 1;
    await checkChat.save();

    const previousMessages = await Message.find({ chatId }).sort({
      createdAt: 1,
    });

    const conversation = [
      ...previousMessages
        .map((msg: any) => [
          { role: "user", parts: [{ text: msg.message }] },
          { role: "model", parts: [{ text: msg.reply }] },
        ])
        .flat(),
    ];

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        ...conversation,
        {
          role: "user",
          parts: [
            {
              text: `${message}
                Respond ONLY with a valid HTML snippet.
                ❗ Do NOT include <!DOCTYPE>, <html>, <head>, <body>, or markdown fences (\`\`\`).
                Return only the inner HTML tags such as <p>, <h1>, <ul>, etc.—pure HTML snippet, no explanations`,
            },
          ],
        },
      ],
    });

    const reply = await result.text;

    const cleaned = reply?.replace(/```(?:html)?\s*([\s\S]*?)\s*```/i, "$1").trim();

    const newMessage = await Message.create({
      message,
      email,
      chatId,
      reply:cleaned,
    });

    return NextResponse.json(
      {
        message: "Message created successfully",
        data: newMessage,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error creating record",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import db from "@/lib/db";
import Chat from "@/models/chat.model";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/auth";
const ai = new GoogleGenAI({ apiKey: process.env.GEMNI_API_KEY! });

export async function POST(req: Request) {
  await db();

  try {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ msg: "No userId provided" }, { status: 401 });
    }

    const { message } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Given the message: "${message}", generate a suitable chat name consisting of only 2 or 3 words. Respond with a single chat name only. Do not include any explanation, formatting, or additional suggestions.`,
    });

    const createChat = await Chat.create({
      email: email,
      chatName: response.text,
    });

    return NextResponse.json(
      {
        message: "Message created successfully",
        chat: createChat,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error creating record",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  await db();

  try {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ msg: "No userId provided" }, { status: 401 });
    }

    const getChat = await Chat.find({ email }).sort({
      createdAt: -1,
    });
    if (!getChat) {
      return NextResponse.json({ chats: [] }, { status: 404 });
    }

    return NextResponse.json(
      {
        chats: getChat,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Error creating record",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

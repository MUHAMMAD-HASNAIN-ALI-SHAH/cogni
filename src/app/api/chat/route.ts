import { NextResponse } from "next/server";
import db from "@/lib/db";
import Chat from "@/models/chat.model";
import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/auth";

const ai = new GoogleGenAI({ apiKey: process.env.GEMNI_API_KEY! });

// ✅ Re-use the CORS headers for all responses
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://cogni-alpha.vercel.app",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  // Preflight request response
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  await db();

  try {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json(
        { msg: "No userId provided" },
        { status: 401, headers: CORS_HEADERS }
      );
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
      { status: 201, headers: CORS_HEADERS }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error creating record",
        error: error.message,
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function GET() {
  await db();

  try {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json(
        { msg: "No userId provided" },
        { status: 401, headers: CORS_HEADERS }
      );
    }

    const getChat = await Chat.find({ email }).sort({ createdAt: -1 });
    if (!getChat) {
      return NextResponse.json(
        { chats: [] },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      { chats: getChat },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error creating record",
        error: error.message,
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

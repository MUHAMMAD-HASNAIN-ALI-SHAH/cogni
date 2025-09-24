import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import Message from "@/models/message.model";
import Chat from "@/models/chat.model";
import { auth } from "@/lib/auth";

// ✅ Common CORS headers
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://cogni-alpha.vercel.app", // ✅ your frontend domain
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Preflight response for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function GET(req: NextRequest, context: { params: { chatId: string } }) {
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

    const chatId = context.params.chatId;

    const getChat = await Chat.findById(chatId);
    if (!getChat) {
      return NextResponse.json(
        { msg: "Chat not found" },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    if (getChat.email !== email) {
      return NextResponse.json(
        { msg: "You are not authorized to access this chat" },
        { status: 403, headers: CORS_HEADERS }
      );
    }

    const messages = await Message.find({ chatId: getChat._id }).sort({
      createdAt: 1,
    });

    return NextResponse.json(messages ?? [], {
      status: 200,
      headers: CORS_HEADERS,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error getting messages",
        error: error.message,
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

import connectDB from "@/app/hooks/connectDB.js"
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import Letter from "@/app/(models)/Letter";

export async function GET(req) {
  try {
    // connect to DB
    await connectDB();

    // check identity
    const token = req.cookies.get("token");
    const decoded = jwt.verify(token.value, process.env.TOKEN_SECRET);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    const userId = decoded.userId;

    // find unread letters
    const unread = await Letter.find({ receipientId: userId });

    // find unsent letters
    const unsent = await Letter.find({ senderId: userId, isDraft: true });

    return NextResponse.json(
      { message: "unread letters and unsent letters found", unread: unread, unsent: unsent},
      
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

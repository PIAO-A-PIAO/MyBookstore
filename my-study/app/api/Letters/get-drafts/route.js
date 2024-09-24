import connectDB from "../../connectDB";
import jwt from "jsonwebtoken";
import Draft from "@/app/(models)/Draft";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();
  try {
    const token = req.cookies.get("token");

    const decoded = jwt.verify(token.value, process.env.TOKEN_SECRET);

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    const userId = decoded.userId;
    const drafts = await Draft.find({ senderId: userId });
    return NextResponse.json(
      { message: "draft fetch successfully", drafts: drafts },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: error.status });
  }
}

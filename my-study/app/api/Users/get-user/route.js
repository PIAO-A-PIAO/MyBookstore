import { NextResponse } from "next/server";
import connectDB from "../../../../lib/connectDB";
import jwt from "jsonwebtoken";
import User from "../../../(models)/User";
import { ObjectId } from "mongodb";

export  async function GET(req) {
  try {
    const token = req.cookies.get("token");
    if (!token) {
      return NextResponse({ message: "Token missing" }, { status: 404 });
    }
    const decoded = jwt.verify(token.value, process.env.TOKEN_SECRET);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    await connectDB();
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User found", user: user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}

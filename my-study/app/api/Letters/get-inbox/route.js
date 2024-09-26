import connectDB from "../../connectDB.js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import Letter from "@/app/(models)/Letter";

export async function GET(req) {
  // connect to DB
  await connectDB();
  try {
    // check identity
    const token = req.cookies.get("token");
    if (!token){
      return NextResponse.json({message:"token not found"},{status: 404})
    }
    const decoded = jwt.verify(token.value, process.env.TOKEN_SECRET);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    const userId = decoded.userId;

    // find inbox letters
    const inbox = await Letter.find({ receipientId: userId });

    return NextResponse.json(
      { message: "inbox letters found", inbox: inbox },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: error.status });
  }
}

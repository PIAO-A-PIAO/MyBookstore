import connectDB from "../../connectDB.js"
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const token = req.cookies.get("token");

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

    console.log(body)
    return NextResponse({message: "testing"},{status: 400});

  } catch (error) {
    console.error(error);
    return NextResponse({message: error.message},{status: 400});
  }
}

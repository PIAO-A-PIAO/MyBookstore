import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/hooks/connectDB";
import User from "@/app/(models)/User";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json();

    const token = req.cookies.get("token");
    const decoded = jwt.verify(token.value, process.env.TOKEN_SECRET);

    if (!decoded.userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    await connectDB();

    // Convert decoded.userId to ObjectId
    const userId = new ObjectId(decoded.userId);
    const user = await User.findById(userId); // This will now use the ObjectId

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log(user); // Log the user's name

    return NextResponse.json(
      { message: "User onboarded successfully", userName: user.userName },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 } // Use a default status code for server errors
    );
  }
}

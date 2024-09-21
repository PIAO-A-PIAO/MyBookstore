import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/app/hooks/connectDB";
import User from "@/app/(models)/User";
import Stamp from "@/app/(models)/Stamp";
import { ObjectId } from "mongodb";

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();

    const token = req.cookies.get("token");
    const decoded = jwt.verify(token.value, process.env.TOKEN_SECRET);

    if (!decoded.userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Convert decoded.userId to ObjectId
    const userId = new ObjectId(decoded.userId);
    const user = await User.findById(userId); // This will now use the ObjectId
    const defaultStamp = await Stamp.findOne({ name: "default" });
    if (!defaultStamp) {
      return NextResponse.json({ message: "Stamp not found" }, { status: 404 });
    }
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    Object.assign(user, body);
    user.onboarded = true;
    user.stamps = [{ stampId: defaultStamp._id, number: 5 }];

    await user.save();
    const tokenData = {
      userId: user._id,
      name: user.name,
      email: user.email,
      onboarded: user.onboarded,
    };
    const newToken = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "User onboarded successfully" },
      { status: 200 }
    );

    response.cookies.set("token", newToken);
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: 500 } // Use a default status code for server errors
    );
  }
}

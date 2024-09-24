import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "../../connectDB.js"
export async function POST(req) {
  await connectDB();
  try {

    const body = await req.json();
    const userData = body.formData;

    if (!userData?.user || !userData.password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      $or: [{ email: userData.user }, { name: userData.user }],
    })
      .lean()
      .exec();

    if (!user) {
      return NextResponse.json({ message: "No user found" }, { status: 400 });
    }

    const validPassword = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    const tokenData = {
      userId: user._id,
      name: user.name,
      email: user.email,
      onboarded: user.onboarded || false
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
      },
      { status: 200 }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    };

    if (userData["remember-me"]) {
      cookieOptions.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }

    response.cookies.set("token", token, cookieOptions);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

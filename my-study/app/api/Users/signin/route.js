import { NextResponse } from "next/server";
import User from "@/app/(models)/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export async function POST(req) {
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
      id: user.id,
      name: user.name,
      email: user.email,
    };
const token = await jwt.sign(tokenData, process.eventNames.TOKEN_SECRET, {expiresIn: "1d"})

    return NextResponse.json({ message: "Valid password" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

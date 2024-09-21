import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function GET(req) {
  try {
    const token = req.cookies.get("token");
    if (!token) {
      return NextResponse.json({ message: "Token missing" }, { status: 401 });
    }
    const decoded = jwt.verify(token.value, process.env.TOKEN_SECRET);

    if (!decoded.userId) {
      return NextResponse.json({ message: "Token not valid" }, { status: 401 });
    } else {
      return NextResponse.json({ message: "token is valid", onboarded:decoded.onboarded }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

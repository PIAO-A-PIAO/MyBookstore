import connectDB from "../../connectDB.js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import Draft from "@/app/(models)/Draft.js";
import { ObjectId } from "mongodb";

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();

    const token = req.cookies.get("token");
    const decoded = jwt.verify(token.value, process.env.TOKEN_SECRET);
    if (!decoded || !decoded.userId) {
      return NextResponse({ message: "Invalid token" }, { status: 401 });
    }
    body.senderId = decoded.userId;
    if (body._id !== "") {
      const draftId = new ObjectId(body._id);
      const draft = await Draft.findById(draftId);
      if (!draft) {
        return NextResponse.json({ message: "wrong draftId" }, { status: 400 });
      } else {
        const { _id, ...bodyWithoutId } = body;
        Object.assign(draft, bodyWithoutId)
        draft.save();
        return NextResponse.json({ message: "draft updated" }, { status: 200 });
      }
    }

    const { _id, ...bodyWithoutId } = body;
    await Draft.create(bodyWithoutId);

    return NextResponse.json({ message: "draft saved" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

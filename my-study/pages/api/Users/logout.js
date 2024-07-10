import { NextResponse } from "next/server";

export default async function handler(req, res) {
  try {
    // Clear the token cookie by setting an expired date in the past
    res.setHeader("Set-Cookie", `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT`);

    // Respond with a JSON message indicating successful logout
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    // If there's an error, respond with a JSON message indicating the error
    return res.status(500).json({
      error: error.message,
    });
  }
}

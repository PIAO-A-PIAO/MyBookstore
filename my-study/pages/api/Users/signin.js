import User from "../(models)/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body;
      const userData = body.formData;

      // check missing fields
      if (!userData?.user || !userData.password) {
        return res.status(400).json({ message: "All fields are required." });
      }

      // find user by email or username
      const user = await User.findOne({
        $or: [{ email: userData.user }, { name: userData.user }],
      })
        .lean()
        .exec();

      // user not found
      if (!user) {
        return res.status(400).json({ message: "No user found" });
      }

      // check password
      const validPassword = await bcrypt.compare(
        userData.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }

      // if password correct, prepare token and cookie
      const tokenData = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
      const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });

      let cookieOptions = "Path=/; HttpOnly;";

      // if remember-me is true, grant one-week-long cookie
      if (userData["remember-me"]) {
        cookieOptions += `Max-Age=${60 * 60 * 24 * 7}`;
      }

      // set cookie
      res.setHeader("Set-Cookie", `token=${token}; ${cookieOptions}`);

      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Error", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

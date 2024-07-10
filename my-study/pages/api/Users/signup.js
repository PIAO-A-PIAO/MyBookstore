import User from "../(models)/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  // Handle only POST requests
  if (req.method === "POST") {
    try {
      // Parse the request body
      const body = await req.body;
      const userData = body.formData;

      // Check if the required fields (email and password) are present
      if (!userData?.email || !userData.password) {
        // Respond with an error message if any field is missing
        return res.json({ message: "All fields are required." }, { status: 400 });
      }

      // Check if a user with the same email or name already exists in the database
      const duplicate = await User.findOne({
        $or: [{ email: userData.email }, { name: userData.name }],
      })
        .lean()
        .exec();

      // If a duplicate user is found, respond with an error message
      if (duplicate) {
        return res.json({ message: "Duplicate Email" }, { status: 409 });
      }

      // Hash the user's password before storing it in the database
      const hashPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashPassword;

      // Create a new user record in the database
      await User.create(userData);

      // Respond with a success message
      return res.json({ message: "User Created." }, { status: 201 });
    } catch (error) {
      // Log the error and respond with an error message
      console.log(error);
      return res.json({ message: "Error", error }, { status: 500 });
    }
  }
}

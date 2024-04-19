// import ConnectMongodb from "@/lib/Mongodb";
// import User from "@/models/User";
// import { NextResponse } from "next/server";

// export const POST = async (request: any) => {
//   try {
//     const { name, email } = await request.json();
//     await ConnectMongodb();
//     await User.create({ name, email });
//     return NextResponse.json({ message: "User Registered" }, { status: 201 });
//   } catch (error) {
//     console.log(error);
//   }
// };
import ConnectMongodb from "@/lib/Mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: any) => {
  const { username, email, password } = await request.json();

  await ConnectMongodb();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
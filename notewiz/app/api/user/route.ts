import connect from "@/lib/Mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/index"
import { NextApiRequest, NextApiResponse } from "next";

export const POST = async (request: any) => {
  const { username, email, password } = await request.json();

  // await connect();

  // const existingUser = await User.findOne({ email });
  const existingUser = await prisma.user.findUnique({
    where: {
      email:email
    }
  })

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  try {
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = await prisma.user.create({
    data:{
      username,
      email,
      password: hashedPassword,
    }
  });

    // s
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};



export const GET = async (request:NextRequest) => {
  const { searchParams } = new URL(request.url ?? '');
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ message: "Invalid email" }, { status: 400 });
  }

  try {
    const userData = await prisma.user.findUnique({
      where: { email },
    });

    if (!userData) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log(userData);
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

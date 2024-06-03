import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/prisma/index"
import { NextApiRequest, NextApiResponse } from "next";

// export  async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
//   ) {
//     if (req.method === "GET") {
//       const { email } = req.query;
  
//       if (typeof email !== "string") {
//         return res.status(400).json({ message: "Invalid email" });
//       }
  
//       try {
//         const userData = await prisma.user.findUnique({
//           where: {
//             email,
//           },
//         });
  
//         if (!userData) {
//           return res.status(404).json({ message: "User not found" });
//         }
  
//         return res.status(200).json(userData);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         return res.status(500).json({ message: "Internal Server Error" });
//       }
//     } else {
//       return res.status(405).json({ message: "Method Not Allowed" });
//     }
// }
export const GET = async (request:NextApiRequest) => {
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
    
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

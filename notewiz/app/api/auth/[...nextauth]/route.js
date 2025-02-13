// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { type GetServerSidePropsContext } from "next";
// import {
//   getServerSession,
//   type NextAuthOptions,
//   type DefaultSession,
// } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// <<<<<<< HEAD
// import { prisma } from "@/lib/prisma";
// import User from "@/models/User"; // Assuming you have a User model defined somewhere
// =======
// import User from "@/models/User";
// import connect from "@/lib/Mongodb";
// import { Account, User as AuthUser,  } from "next-auth";
// // import jwt, { getToken } from "next-auth/jwt"
// import prisma from "@/prisma/index"
// import jwt from "jsonwebtoken"
// import { JWT } from 'next-auth/jwt';
// import http from 'http';
// import https from 'https';
// import { Session } from "inspector";
// >>>>>>> 50b2c2fa7121e8451911aaa95cb8673513319a86

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       // ...other properties
//       // role: UserRole;
//     } & DefaultSession["user"];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {
//     jwt: async ({ token, user }) => {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     session: ({ session, token }) => {
//       if (token) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//         session.user.email = token.email;
//         session.user.image = token.picture;
//       }
//       return session;
//     },
//   },
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
// <<<<<<< HEAD
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }
// =======
//       async authorize(credentials: any) {
//         // await connect();
//         try {
//           const user = await prisma.user.findUnique({
//             where: {
//               email: credentials.email
//             }
//           });
//           if (user) {
//             const isPasswordCorrect = await bcrypt.compare(
//               credentials.password,
//               user.password
//             );
//             if (isPasswordCorrect) {
//               return Promise.resolve(user);
//             }
//           }
//            return Promise.resolve(null);
//         } catch (err: any) {
//           throw new Error(err);
//         }
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
//       httpOptions: {
//         timeout: 10000,
//       }
//     }),

//     // ...add more providers here
//   ],
//   events: {
//     httpOptions: {
//       http: {
//         agents: {
//           http: new http.Agent({ keepAlive: false }),
//           https: new https.Agent({ keepAlive: false }),
//         },
//       },
//     },
//   },
//   timeout: 10000,
//   session: {

//     maxAge: 3600, // 1 hour (in seconds)
//   },
//   callbacks: {
//     async signIn({ user, account }: { user: AuthUser; account: Account }) {
//       if (account?.provider === "credentials") {

//         // if(account.access_token){
//         //   return account.access_token
//         // }
//         // else{
//         //   console.log("no access token")
//         // }
//         return true ;
//       }
//       if (account?.provider === "google") {
//         // await connect();
//         try {
//           const existingUser = await prisma.user.findUnique({
//             where: {
//               email:user.email ?? ''
//             }
//           })
//           if (!existingUser) {
//             // const newUser = new User({
//             //   email: user.email,
//             // });
//               // Generate a random password for the new user
//           const randomPassword = Math.random().toString(36).slice(-8);

//         // Hash the password
//           const hashedPassword = await bcrypt.hash(randomPassword, 10);
//             const newUser = await prisma.user.create({
//               data:{
//                 email: user.email ?? '',
//                 password: hashedPassword,
//                 image: user.image,
//                 username:user.name
                
//               }
//             });
//             // await newUser.save();
//             return true;
//           }

          
//           return true;
//         } catch (err) {
//           console.log("Error saving user", err);
//           return false;
//         }
//       }
//     },
//     async jwt({ token, user, account, profile, isNewUser }:{
//       token: JWT;
//       user?: { id: string; email: string; name:string } | undefined;
//       account?: { provider: string } | undefined;
//       profile?: any;
//       isNewUser?: boolean;
//     }) {
//       if (account?.provider === "credentials") {
//         // Generate a new access token for the "Credentials" provider
//         const jwtSecret = process.env.JWT_SECRET;
//         if (typeof jwtSecret !== 'string') {
//           console.error('JWT_SECRET is not defined or is not a string');
//           // You can either throw an error or return a default value here
//           // For example, you can return the current token without generating a new access token
//           return token;
//         }
          
//           const accessToken = jwt.sign(
//             {
//               id: user?.id ?? '',
//               email: user?.email ??'',
//               // Add any other claims you want to include in the access token
//             },
//            jwtSecret, // Replace with your own secret key
//             { expiresIn: "3600" } // Set the desired expiration time
//           );
      
//           token.accessToken = accessToken;
//           console.log("Access Token:", token.accessToken);
//       } else {
//         // Modify or add new fields to the JWT for other providers
//         if (user) {
//           token.id = user.id;
//         }
//       }
//       if (account?.provider === "google") {
//         // Log the token from Google
//         console.log("Token from Google:", token);
//       }
    
//       let expirationTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // Expires in 24 hours from now
//       token.exp = expirationTime;
    
//       return token;
//     },
//     async session({ session, token, user }: {session:any,token:JWT,user:AuthUser}) {
//       // Customize the session object here if necessary
//        // Add custom data to session object
//       // console.log(user?.email)
//        const existingUser = await prisma.user.findUnique({
//         where: {
//           email:session.user.email ?? ''
//         }
//        })
      
//       // const flashcards = await prisma.flashcard.findMany({
//       //   where: {
//       //     flashcardSetId:UserFlashCards?.id 
//       //   }
//       // })
//       if (existingUser) {
//         session.user.name = existingUser.username ?? null;
//         session.user.id=existingUser.id ?? null
//         session.accessToken = token.accessToken
//         session.user.image = existingUser.image ?? null
//         const UserFlashCards = await prisma.flashcardSet?.findMany({
//           where: {
//             userId: existingUser.id
//           }
//         });
//         if (UserFlashCards) {
//           session.user.flashcardSet = UserFlashCards;
//         } else {
//           session.user.flashcardSet = null;
//         }
//         const Chatbots = await prisma.chatbot?.findMany({
//           where: {
//             userId:existingUser.id
//           }
//         })
//         console.log(Chatbots);
//         if (Chatbots) {
//           // session.user.chatbotId=Chatbots.id
//           session.user.chatbots = Chatbots;
//         } else {
//           session.user.chatbots=null
//         }
//         // session.flashcardTopic = UserFlashCards?.prompt
//         // session.flashcardDate= UserFlashCards?.createdAt
//       }
//       return session;
//     },
//     // async jwt({ token, user, account, profile, isNewUser }:{session:any,user:any,token:any,account:any,profile:any,isNewUser:any}) {
//     //   // Modify or add new fields to the JWT
//     //   if (user) {
//     //     token.id = user.id;  // For example, add user id to the JWT
//     //   }
//     //   let expirationTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // Expires in 24 hours from now
//     //   token.exp = expirationTime;
//     //   return token;
//     // }
// >>>>>>> 50b2c2fa7121e8451911aaa95cb8673513319a86
    
//         await prisma.$connect();
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });
    
//         if (user && (await bcrypt.compare(credentials.password, user.password))) {
//           return user;
//         }
    
//         return null;
//       },
//     }),
//   ],
// };

// export const getAuthSession = () => {
//   return getServerSession(authOptions);
// };

// //below

// // import NextAuth from "next-auth/next";
// // import GoogleProvider from "next-auth/providers/google";
// // import CredentialsProvider from "next-auth/providers/credentials";
// // import bcrypt from "bcryptjs";
// // import User from "@/models/User";
// // import connect from "@/lib/Mongodb";
// // import { Account, User as AuthUser,  } from "next-auth";
// // // import jwt, { getToken } from "next-auth/jwt"
// // // import prisma from "@/prisma/index"
// // import jwt from "jsonwebtoken";
// // import { JWT } from 'next-auth/jwt';
// // import http from 'http';
// // import https from 'https';
// // import { Session } from "inspector";
// // import {prisma} from '@/lib/prisma';



// // export const authOptions: any = {
// //   // Configure one or more authentication providers
// //   providers: [
// //     CredentialsProvider({
// //       id: "credentials",
// //       name: "Credentials",
// //       credentials: {
// //         email: { label: "email", type: "email" },
// //         password: { label: "password", type: "password" },
// //       },
// //       async authorize(credentials: any) {
// //         // await connect();
// //         try {
// //           const user = await prisma.user.findUnique({
// //             where: {
// //               email: credentials.email
// //             }
// //           });
// //           if (user) {
// //             const isPasswordCorrect = await bcrypt.compare(
// //               credentials.password,
// //               user.password
// //             );
// //             if (isPasswordCorrect) {
// //               return Promise.resolve(user);
// //             }
// //           }
// //            return Promise.resolve(null);
// //         } catch (err: any) {
// //           throw new Error(err);
// //         }
// //       },
// //     }),
// //     GoogleProvider({
// //       clientId: process.env.GOOGLE_CLIENT_ID ?? "",
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
// //       httpOptions: {
// //         timeout: 10000,
// //       }
// //     }),

// //     // ...add more providers here
// //   ],
// //   events: {
// //     httpOptions: {
// //       http: {
// //         agents: {
// //           http: new http.Agent({ keepAlive: false }),
// //           https: new https.Agent({ keepAlive: false }),
// //         },
// //       },
// //     },
// //   },
// //   timeout: 10000,
// //   session: {

// //     maxAge: 3600, // 1 hour (in seconds)
// //   },
// //   callbacks: {
// //     async signIn({ user, account }: { user: AuthUser; account: Account }) {
// //       if (account?.provider === "credentials") {

// //         // if(account.access_token){
// //         //   return account.access_token
// //         // }
// //         // else{
// //         //   console.log("no access token")
// //         // }
// //         return true ;
// //       }
// //       if (account?.provider === "google") {
// //         // await connect();
// //         try {
// //           const existingUser = await prisma.user.findUnique({
// //             where: {
// //               email:user.email ?? ''
// //             }
// //           })
// //           if (!existingUser) {
// //             // const newUser = new User({
// //             //   email: user.email,
// //             // });
// //               // Generate a random password for the new user
// //           const randomPassword = Math.random().toString(36).slice(-8);

// //         // Hash the password
// //           const hashedPassword = await bcrypt.hash(randomPassword, 10);
// //             const newUser = await prisma.user.create({
// //               data:{
// //                 email: user.email ?? '',
// //                 password: hashedPassword,
// //                 image: user.image,
// //                 username:user.name
                
// //               }
// //             });
// //             // await newUser.save();
// //             return true;
// //           }

          
// //           return true;
// //         } catch (err) {
// //           console.log("Error saving user", err);
// //           return false;
// //         }
// //       }
// //     },
// //     async jwt({ token, user, account, profile, isNewUser }:{
// //       token: JWT;
// //       user?: { id: string; email: string; name:string } | undefined;
// //       account?: { provider: string } | undefined;
// //       profile?: any;
// //       isNewUser?: boolean;
// //     }) {
// //       if (account?.provider === "credentials") {
// //         // Generate a new access token for the "Credentials" provider
// //         const jwtSecret = process.env.JWT_SECRET;
// //         if (typeof jwtSecret !== 'string') {
// //           console.error('JWT_SECRET is not defined or is not a string');
// //           // You can either throw an error or return a default value here
// //           // For example, you can return the current token without generating a new access token
// //           return token;
// //         }
          
// //           const accessToken = jwt.sign(
// //             {
// //               id: user?.id ?? '',
// //               email: user?.email ??'',
// //               // Add any other claims you want to include in the access token
// //             },
// //            jwtSecret, // Replace with your own secret key
// //             { expiresIn: "3600" } // Set the desired expiration time
// //           );
      
// //           token.accessToken = accessToken;
// //           console.log("Access Token:", token.accessToken);
// //       } else {
// //         // Modify or add new fields to the JWT for other providers
// //         if (user) {
// //           token.id = user.id;
// //         }
// //       }
// //       if (account?.provider === "google") {
// //         // Log the token from Google
// //         console.log("Token from Google:", token);
// //       }
    
// //       let expirationTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // Expires in 24 hours from now
// //       token.exp = expirationTime;
    
// //       return token;
// //     },
// //     async session({ session, token, user }: {session:any,token:JWT,user:AuthUser}) {
// //       // Customize the session object here if necessary
// //        // Add custom data to session object
// //       // console.log(user?.email)
// //        const existingUser = await prisma.user.findUnique({
// //         where: {
// //           email:session.user.email ?? ''
// //         }
// //        })
      
// //       // const flashcards = await prisma.flashcard.findMany({
// //       //   where: {
// //       //     flashcardSetId:UserFlashCards?.id 
// //       //   }
// //       // })
// //       if (existingUser) {
// //         session.user.name = existingUser.username ?? null;
// //         session.user.id=existingUser.id ?? null
// //         session.accessToken = token.accessToken
// //         session.user.image = existingUser.image ?? null
// //         // const UserFlashCards = await prisma.flashcardSet?.findMany({
// //         //   where: {
// //         //     userId: existingUser.id
// //         //   }
// //         // });
// //         // if (UserFlashCards) {
// //         //   session.user.flashcardSet = UserFlashCards;
// //         // } else {
// //         //   session.user.flashcardSet = null;
// //         // }
// //         // const Chatbots = await prisma.chatbot?.findMany({
// //         //   where: {
// //         //     userId:existingUser.id
// //         //   }
// //         // })
// //         // console.log(Chatbots);
// //         // if (Chatbots) {
// //         //   // session.user.chatbotId=Chatbots.id
// //         //   session.user.chatbots = Chatbots;
// //         // } else {
// //         //   session.user.chatbots=null
// //         // }
// //         // session.flashcardTopic = UserFlashCards?.prompt
// //         // session.flashcardDate= UserFlashCards?.createdAt
// //       }
// //       return session;
// //     },
// //     // async jwt({ token, user, account, profile, isNewUser }:{session:any,user:any,token:any,account:any,profile:any,isNewUser:any}) {
// //     //   // Modify or add new fields to the JWT
// //     //   if (user) {
// //     //     token.id = user.id;  // For example, add user id to the JWT
// //     //   }
// //     //   let expirationTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // Expires in 24 hours from now
// //     //   token.exp = expirationTime;
// //     //   return token;
// //     // }
    
// //   },
  
// // };

// // export const handler = NextAuth(authOptions);
// // export { handler as GET, handler as POST };
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/lib/Mongodb";
import { Account, User as AuthUser,  } from "next-auth";
// import jwt, { getToken } from "next-auth/jwt"
import prisma from "@/prisma/index"
import jwt from "jsonwebtoken"
import { JWT } from 'next-auth/jwt';
import http from 'http';
import https from 'https';
import { Session } from "inspector";



 const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        // await connect();
        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });
          if (user && user.password) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return Promise.resolve(user);
            }
          }
           return Promise.resolve(null);
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      httpOptions: {
        timeout: 10000,
      }
    }),

    // ...add more providers here
  ],
  events: {
    httpOptions: {
      http: {
        agents: {
          http: new http.Agent({ keepAlive: false }),
          https: new https.Agent({ keepAlive: false }),
        },
      },
    },
  },
  timeout: 10000,
  session: {

    maxAge: 3600, // 1 hour (in seconds)
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {

        // if(account.access_token){
        //   return account.access_token
        // }
        // else{
        //   console.log("no access token")
        // }
        return true ;
      }
      if (account?.provider === "google") {
        // await connect();
        try {
          const existingUser = await prisma.user.findUnique({
            where: {
              email:user.email ?? ''
            }
          })
          if (!existingUser) {
            // const newUser = new User({
            //   email: user.email,
            // });
              // Generate a random password for the new user
          const randomPassword = Math.random().toString(36).slice(-8);

        // Hash the password
          const hashedPassword = await bcrypt.hash(randomPassword, 10);
            const newUser = await prisma.user.create({
              data:{
                email: user.email ?? '',
                password: hashedPassword,
                image: user.image,
                username:user.name
                
              }
            });
            // await newUser.save();
            return true;
          }

          
          return true;
        } catch (err) {
          console.log("Error saving user", err);
          return false;
        }
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account?.provider === "credentials") {
        // Generate a new access token for the "Credentials" provider
        const jwtSecret = process.env.JWT_SECRET;
        if (typeof jwtSecret !== 'string') {
          console.error('JWT_SECRET is not defined or is not a string');
          // You can either throw an error or return a default value here
          // For example, you can return the current token without generating a new access token
          return token;
        }
          
          const accessToken = jwt.sign(
            {
              id: user?.id ?? '',
              email: user?.email ??'',
              // Add any other claims you want to include in the access token
            },
           jwtSecret, // Replace with your own secret key
            { expiresIn: "3600" } // Set the desired expiration time
          );
      
          token.accessToken = accessToken;
          console.log("Access Token:", token.accessToken);
      } else {
        // Modify or add new fields to the JWT for other providers
        if (user) {
          token.id = user.id;
        }
      }
      if (account?.provider === "google") {
        // Log the token from Google
        console.log("Token from Google:", token);
      }
    
      let expirationTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // Expires in 24 hours from now
      token.exp = expirationTime;
    
      return token;
    },
    async session({ session, token, user }) {
      // Customize the session object here if necessary
       // Add custom data to session object
      // console.log(user?.email)
       const existingUser = await prisma.user.findUnique({
        where: {
          email:session.user.email ?? ''
        }
       })
      
      // const flashcards = await prisma.flashcard.findMany({
      //   where: {
      //     flashcardSetId:UserFlashCards?.id 
      //   }
      // })
      if (existingUser) {
        session.user.name = existingUser.username ?? null;
        session.user.id=existingUser.id ?? null
        session.accessToken = token.accessToken
        session.user.image = existingUser.image ?? null
        const UserFlashCards = await prisma.flashcardSet?.findMany({
          where: {
            userId: existingUser.id
          }
        });
        if (UserFlashCards) {
          session.user.flashcardSet = UserFlashCards;
        } else {
          session.user.flashcardSet = null;
        }
        const Chatbots = await prisma.chatbot?.findMany({
          where: {
            userId:existingUser.id
          }
        })
        console.log(Chatbots);
        if (Chatbots) {
          // session.user.chatbotId=Chatbots.id
          session.user.chatbots = Chatbots;
        } else {
          session.user.chatbots=null
        }
        const ChatOnlyBots = await prisma.chatOnlyBot?.findMany({
          where: {
            userId:existingUser.id
          }
        })
        console.log(ChatOnlyBots);
        if (ChatOnlyBots) {
          // session.user.chatbotId=Chatbots.id
          session.user.chatOnlyBots = ChatOnlyBots;
        } else {
          session.user.chatOnlyBots=null
        }
        const quizSet = await prisma.quizSet?.findMany({
          where:{userId:existingUser.id}
        })
        if (quizSet) {
          session.user.quizSet = quizSet;
        } else {
          session.user.quizSet=null
        }
        // session.flashcardTopic = UserFlashCards?.prompt
        // session.flashcardDate= UserFlashCards?.createdAt
      }
      return session;
    },
    // async jwt({ token, user, account, profile, isNewUser }:{session:any,user:any,token:any,account:any,profile:any,isNewUser:any}) {
    //   // Modify or add new fields to the JWT
    //   if (user) {
    //     token.id = user.id;  // For example, add user id to the JWT
    //   }
    //   let expirationTime = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // Expires in 24 hours from now
    //   token.exp = expirationTime;
    //   return token;
    // }
    
  },
  
};

 const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
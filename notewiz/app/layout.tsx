import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/lib/SessionProvider";
import localFont from "next/font/local"

const dm_sans = DM_Sans({ subsets: ["latin"] });

const grotesque = localFont({
  src: [
    {
      path: '../fonts/BricolageGrotesque-Light-BF648bd57867903.otf',
      weight: '300'
    },
    {
      path: '../fonts/BricolageGrotesque-Medium-BF648bd578394c9.otf',
      weight: '500'
    },
    {
      path:'../fonts/BricolageGrotesque-Regular-BF648bd5781d794.otf',
      weight:'400'
    },
    {
      path:'../fonts/BricolageGrotesque-SemiBold-BF648bd578894ae.otf',
      weight:'600'
    }
  ],
  variable: '--font-grotesque'
})

export const metadata: Metadata = {
  title: "NoteWiz",
  description: "AI powered education app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body className={`${grotesque.variable} ${dm_sans.className}`} font-sans-serif='true'>{children}</body>
      </SessionProvider>
    </html>
  );
}

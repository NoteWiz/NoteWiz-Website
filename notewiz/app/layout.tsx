import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/lib/SessionProvider";
import localFont from "next/font/local"
import Script from 'next/script'

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
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-M3925D8N');
          `}
        </Script>
      </head>
      <SessionProvider session={session}>
          <noscript>
            <iframe 
              src="https://www.googletagmanager.com/ns.html?id=GTM-M3925D8N"
              height="0" 
              width="0" 
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          {children}
        </SessionProvider>
    </html>
  );
}

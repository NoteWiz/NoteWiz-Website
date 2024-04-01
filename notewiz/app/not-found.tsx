import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex h-screen w-screen items-center justify-center bg-primary-b-500 dark:bg-primary-a-700">
          <div className="flex flex-col items-center lg:w-[731px]">
            <h1 className="text-center text-[360px] font-semibold italic leading-[400px] text-primary-a-500 dark:text-primary-a-100 lt-lg:text-[280px] lt-lg:leading-[300px] lt-md:text-[160px] lt-md:leading-[180px]">
              404
            </h1>
            <Link
              className="text-center text-5xl font-medium leading-[56px] tracking-[-0.96px] text-primary-a-500 dark:text-primary-b-500  lt-md:text-[32px] lt-md:leading-9 lt-md:tracking-[-0.64px]"
              href="/"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}

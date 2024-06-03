// import React from 'react'
// import QuestionsList from "@/components/QuestionsList/QuestionsList";
// import { buttonVariants } from "@/components/ui/button";
// import { prisma } from "@/lib/prisma";
// import { LucideLayoutDashboard } from "lucide-react";
// import Link from "next/link";


// type Props = {
//   // params: {
//   //   gameId: string;
//   // };
// }

// const ViewOldQuiz = (props: Props) => {
//   return (
//     <>
//       <div className="p-8 mx-auto max-w-7xl">
//         <div className="flex items-center justify-between space-y-2">
//           <h2 className="text-3xl font-bold tracking-tight">Summary</h2>
//           <div className="flex items-center space-x-2">
//             <Link href="/dashboard" className={buttonVariants()}>
//               <LucideLayoutDashboard className="mr-2" />
//               Back to Dashboard
//             </Link>
//           </div>
//         </div>

//         {/* <div className="grid gap-4 mt-4 md:grid-cols-7">
//           <ResultsCard accuracy={accuracy} />
//           <AccuracyCard accuracy={accuracy} />
//           <TimeTakenCard
//             timeEnded={new Date(game.timeEnded ?? 0)}
//             timeStarted={new Date(game.timeStarted ?? 0)}
//           />
//         </div> */}
//         <QuestionsList questions={game.questions} />
//       </div>
//     </>
//   )
// }

// export default ViewOldQuiz
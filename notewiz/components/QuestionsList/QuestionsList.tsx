// "use client";
// import React from "react";

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// // import { Question } from "@prisma/client";
// type Props = {
// //   questions: Question[];
// };

// const QuestionsList = (props: Props) => {
//   return (
//     <Table className="mt-4">
//       <TableCaption>End of list.</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead className="w-[10px]">No.</TableHead>
//           <TableHead>Question & Correct Answer</TableHead>
//           <TableHead>Your Answer</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         <>
//           {questions.map(
//             (
//               { answer, question, userAnswer, percentageCorrect, isCorrect },
//               index
//             ) => {
//               return (
//                 <TableRow key={index}>
//                   <TableCell className="font-medium">{index + 1}</TableCell>
//                   <TableCell>
//                     {question} <br />
//                     <br />
//                     <span className="font-semibold">{answer}</span>
//                   </TableCell>
//                     <TableCell
//                       className={`${
//                         isCorrect ? "text-green-600" : "text-red-600"
//                       } font-semibold`}
//                     >
//                       {userAnswer}
//                     </TableCell>
//                 </TableRow>
//               );
//             }
//           )}
//         </>
//       </TableBody>
//     </Table>
//   )
// }

// export default QuestionsList
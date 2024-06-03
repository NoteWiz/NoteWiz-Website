import { prisma } from "@/lib/prisma";
import { Clock, CopyCheck, Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";
// import MCQCounter from "./MCQCounter";

type Props = {
    limit: number;
    userId: string;
}

const QuizHistoryComponent = ({ limit, userId }: Props) => {
    // const games = await prisma.game.findMany({
    //     take: limit,
    //     where: {
    //       userId,
    //     },
    //     orderBy: {
    //       timeStarted: "desc",
    //     },
    //   });
    return (
        <div className="space-y-8">
        {/* {games.map((game) => { */}
          {/* return ( */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
              <CopyCheck className="mr-3" />
                {/* {game.gameType === "mcq" ? (
                  <CopyCheck className="mr-3" />
                ) : (
                  <Edit2 className="mr-3" />
                )} */}
                <div className="ml-4 space-y-1">
                  <Link
                    className="text-base font-medium leading-none underline"
                    // href={`/statistics/${game.id}`}
                    href="#"
                  >
                    {/* {game.topic} */} prompt
                  </Link>
                  <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
                    <Clock className="w-4 h-4 mr-1" />
                    {/* {new Date(game.timeEnded ?? 0).toLocaleDateString()} */} 1/06/2023
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {/* {game.gameType === "mcq" ? "Multiple Choice" : "Open-Ended"} */} MCQ
                  </p>
                </div>
              </div>
            </div>
          {/* ); */}
        {/* })} */}
      </div>
    );
};

export default QuizHistoryComponent
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";

type Props = {}

const RecentActivityCard = (props: Props) => {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Recent Activity
        </CardTitle>
        <CardDescription>
          You have played a total of 7 quizzes.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll">
       historyyy
      </CardContent>
    </Card>
  )
}

export default RecentActivityCard
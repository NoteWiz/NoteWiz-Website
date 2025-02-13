'use client';
import React from "react";
import { Progress } from "../components/ui/progress";
import LoadingGif from '../assets/loading.gif';

type Props = { finished: boolean };

const loadingTexts = [
    "Generating response...",
    "Unleashing the power of curiosity...",
    "Diving deep into the ocean of questions..",
    "Harnessing the collective knowledge of the cosmos...",
    "Igniting the flame of wonder and exploration...",
  ];

const LoadingQuestions = ({ finished }: Props) => {
    const [progress, setProgress] = React.useState(10);
    const [loadingText, setLoadingText] = React.useState(loadingTexts[0]);
    React.useEffect(() => {
        const interval = setInterval(() => {
          let randomIndex = Math.floor(Math.random() * loadingTexts.length);
          setLoadingText(loadingTexts[randomIndex]);
        }, 2000);
        return () => clearInterval(interval);
      }, []);

      React.useEffect(() => {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (finished) return 100;
            if (prev === 100) {
              return 0;
            }
            if (Math.random() < 0.1) {
              return prev + 2;
            }
            return prev + 0.5;
          });
        }, 100);
        return () => clearInterval(interval);
      }, [finished]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="w-[70vw] md:w-[60vw] flex flex-col items-center">
        <img src={LoadingGif.src} width={600} height={600} alt="loading..." />
        <Progress value={progress} className="w-full mt-4" />
        <h1 className="mt-2 text-xl text-white">{loadingText}</h1>
      </div>
    </div>
  );
};

export default LoadingQuestions
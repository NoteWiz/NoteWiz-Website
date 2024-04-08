"use client";
import { useRouter } from "next/router";

const SelectedSubjectsPage = () => {
  const router = useRouter();
  const selectedSubjects = router.query.selectedSubjects
    ? JSON.parse(router.query.selectedSubjects as string)
    : [];

  return (
    <div className="container mx-auto max-w-md py-8">
      <h1 className="text-2xl font-bold mb-4">Selected Subjects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {selectedSubjects.map((subject: string, index: number) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 flex items-center justify-center"
          >
            <h2 className="text-lg font-semibold">{subject}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedSubjectsPage;

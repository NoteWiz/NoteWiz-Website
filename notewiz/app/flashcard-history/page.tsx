"use client";
import React, { useState } from "react";
import Sidebar from "@/components/FuncSidebar/S";
import { Layers3 } from "lucide-react";
import { useSession } from "next-auth/react";
import Loading from "@/utils/Loading";

import History from "@/components/Flashcard-history/History";
import { useRouter } from "next/navigation";

const FlashcardHistory = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const { data: session, status: sessionStatus } = useSession();
	if (sessionStatus === "loading") {
		return <Loading loading={loading} />; // Show a loading state while session is being loaded
	} else if (sessionStatus === "unauthenticated") {
		router.push("/login");
		return <div>Please sign in to view your account.</div>; // Show a message or redirect to sign-in page
	} else if (sessionStatus === "authenticated") {
		const flashcardSets = session?.user.flashcardSet || [];

		if (!Array.isArray(flashcardSets)) {
			console.error("Flashcard sets is not an array:", flashcardSets);
			return null; // Handle this case appropriately
		}
		return (
			<div className="min-h-screen bg-[#252525]">
				<div className="flex">
					<Sidebar />
					<div className=" w-[80%] grid grid-cols-2 gap-4 m-5 max-sm:w-full max-md:grid max-md:grid-cols-1 max-sm:grid max-sm:grid-cols-1 ">
						{flashcardSets.map((flashcardSet: any, index: any) => (
							<History
								key={index}
								topic={flashcardSet.prompt}
								date={flashcardSet.createdAt}
								id={flashcardSet.id}
							/>
						))}
					</div>
				</div>
			</div>
		);
	}
};

export default FlashcardHistory;

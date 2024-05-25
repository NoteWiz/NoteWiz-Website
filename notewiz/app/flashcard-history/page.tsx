import React from "react";
import Sidebar from "@/components/FuncSidebar/S";
import { Layers3 } from "lucide-react";
import History from "@/components/Flashcard-history/History";

const FlashcardHistory = () => {
	return (
		<div className="min-h-screen bg-[#252525]">
			<div className="flex">
				<Sidebar />
				<div className=" w-[80%] grid grid-cols-2 gap-4 m-5 max-sm:w-full max-md:grid max-md:grid-cols-1 max-sm:grid max-sm:grid-cols-1 ">
					<History />
					<History />
					<History />
					<History />
					<History />
					<History />
					<History />
					<History />
					<History />
					<History />
				</div>
			</div>
		</div>
	);
};

export default FlashcardHistory;

import React from "react";
import { Layers3 } from "lucide-react";

const History = () => {
	return (
		<div
			id="FirstCard"
			className=" mt-20 max-sm:mt-0 w-full h-64 max-sm:h-[300px] max-sm:flex-col max-sm:ml-20 max-sm:w-[300px] bg-[#1E1E1E] rounded-2xl border-2 border-[#1E1E1E] hover:border-[#00E340] hover:border-2"
		>
			<div className="flex flex-col justify-between items-center max-md:flex-col mt-4">
                <Layers3 color="#00E340" size={36}/>
				<p className="text-white text-4xl font-DM_Sans tracking-tighter mt-10   max-md:text-3xl  max-sm:text-4xl max-sm:mt-16">
					Share Flashcards
				</p>
                <p className="text-white text-base mt-20 font-DM_Sans max-sm:mt-20">
                    25/12/2024
                </p>
			</div>
		</div>
	);
};

export default History;

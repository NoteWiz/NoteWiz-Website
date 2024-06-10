import {
	MessagesSquare,
	CircleUserRound,
	Brain,
	Layers3,
	Settings,
	Trophy,
	LayoutDashboard,
	Home,
	CopyPlus,
	Timer
} from "lucide-react";

const items = [
	{
		src: Home,
		label: "Home",
		route: "/home"
	},
	{
		src: MessagesSquare,
		label: "Chat Now",
		route: "/chatbot-dashboard"
	},
	{
		src: Layers3,
		label: "Flashcard",
		route: "/flashcard-dashboard"
	},
	{
		src: Timer,
		label: "Quiz",
		route: "/quiz-dashboard"
	},
	{
		src: LayoutDashboard,
		label: "Dashboard",
		route: "/dashboard"
	},

	// {
	// 	src: CircleUserRound,
	// 	label: "Account",
	// 	route: "/onboarding"
	// },
	// {
	// 	src: Settings,
	// 	label: "Settings",
	// 	route: "/"
	// }
];

export default items;

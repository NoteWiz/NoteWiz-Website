// import account from "@/assets/icons/account.png";
// import chat from "@/assets/icons/chat.png";
// import leaderboard from "@/assets/icons/leaderboard.png";
// import mindmaps from "@/assets/icons/mindmaps.png";
// import flashcard from "@/assets/icons/flashcard.png";
// import history from "@/assets/icons/history.png";
// import dashboard from "@/assets/icons/dashboard.png";
import { MessagesSquare,CircleUserRound,Brain,Layers3,Settings,Trophy,LayoutDashboard } from "lucide-react";
const items = [
  {
    src: MessagesSquare,
    label: "Chat Now",
    route: "/FuncSidebar",
  },
  {
    src: LayoutDashboard,
    label: "Dashboard",
    route: "/dashboard",
  },
  {
    src: Trophy,
    label: "Leaderboard",
    route: "/leaderboard",
  },
  {
    src: Brain,
    label: "Mindmaps",
    route: "/mindmaps",
  },
  {
    src: Layers3,
    label: "Flashcard",
    route: "/flashcard",
  },
  {
    src: Settings,
    label: "Settings",
    route: "/history",
  },
  {
    src: CircleUserRound,
    label: "Account",
    route: "/account",
  },
];

export default items;

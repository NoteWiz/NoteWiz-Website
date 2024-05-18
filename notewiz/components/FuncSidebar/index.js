// import account from "@/assets/icons/account.png";
// import chat from "@/assets/icons/chat.png";
// import leaderboard from "@/assets/icons/leaderboard.png";
// import mindmaps from "@/assets/icons/mindmaps.png";
// import flashcard from "@/assets/icons/flashcard.png";
// import history from "@/assets/icons/history.png";
// import dashboard from "@/assets/icons/dashboard.png";
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
} from "lucide-react";

const items = [
  {
    src: Home,
    label: "Home",
    route: "/home",
  },
  {
    src: MessagesSquare,
    label: "Chat Now",
    route: "/cb",
  },
  {
    src: Layers3,
    label: "Flashcard",
    route: "/flashcard-dashboard",
  },
  {
    src: LayoutDashboard,
    label: "Dashboard",
    route: "/dashboard",
  },

  {
    src: CircleUserRound,
    label: "Account",
    route: "/onboarding",
  },
  {
    src: Settings,
    label: "Settings",
    route: "/",
  },
];

// const cb_items = [
//   {
//     src: CopyPlus,
//     label: "New Chat",
//     route: "/cb"
//   },
//   {
//     src: Home,
//     label: "Home",
//     route: "/home",
//   },
//   {
//     src: MessagesSquare,
//     label: "Chat Now",
//     route: "/cb",
//   },
//   {
//     src: Layers3,
//     label: "Flashcard",
//     route: "/flashcard-dashboard",
//   },
//   {
//     src: LayoutDashboard,
//     label: "Dashboard",
//     route: "/dashboard",
//   },

//   {
//     src: CircleUserRound,
//     label: "Account",
//     route: "/onboarding",
//   },
//   {
//     src: Settings,
//     label: "Settings",
//     route: "/",
//   },
// ];

export default items;

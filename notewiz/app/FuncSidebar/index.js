import account from "@/assets/icons/account.png";
import chat from "@/assets/icons/chat.png";
import leaderboard from "@/assets/icons/leaderboard.png";
import mindmaps from "@/assets/icons/mindmaps.png";
import flashcard from "@/assets/icons/flashcard.png";
import history from "@/assets/icons/history.png";
import dashboard from "@/assets/icons/dashboard.png";
const items = [
  {
    src: chat,
    label: "Previous Chats",
    route: "/FuncSidebar",
  },
  {
    src: dashboard,
    label: "Dashboard",
    route: "/dashboard",
  },
  {
    src: leaderboard,
    label: "Leaderboard",
    route: "/leaderboard",
  },
  {
    src: mindmaps,
    label: "Mindmaps",
    route: "/mindmaps",
  },
  {
    src: flashcard,
    label: "Flashcard",
    route: "/flashcard",
  },
  {
    src: history,
    label: "History",
    route: "/history",
  },
  {
    src: account,
    label: "Account",
    route: "/account",
  },
];

export default items;

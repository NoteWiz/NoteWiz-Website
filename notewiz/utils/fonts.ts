import { Montserrat } from "next/font/google";
import localFont_ from "next/font/local";

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--montserrat-font",
  weight: ["300", "400", "500", "600", "700"],
});

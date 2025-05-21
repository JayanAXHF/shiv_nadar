import "~/styles/globals.css";

import { type Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "../components/theme-provider";
import { PostHogProvider } from "../components/PostHogProvider";

export const metadata: Metadata = {
  title: "Valtam",
  description:
    "This is the interschool code for the Shiv Nadar AI Chatbot competition from the Lotus Valley Gurgaon Team. It is an AI chatbot which runs on NextJS. The llm was built in python, and we use fastapi for the backend to interact with the LLM. ",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

const font = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${font.variable}`}>
      <body className="bg-black text-white ">
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}


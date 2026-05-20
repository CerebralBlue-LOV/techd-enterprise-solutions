import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import IntroSplash from "@/components/shared/IntroSplash";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <IntroSplash />
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
    <ChatWidget />
  </div>
);

export default Layout;

import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main key={pathname} className="flex-1 animate-page-fade motion-reduce:animate-none">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Layout;

import { useEffect, type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

// Import AOS
import "aos/dist/aos.css";
import AOS from "aos";

// Initialize AOS on component mount
const initializeAOS = () => {
  AOS.init({
    duration: 1000, // global duration for animations
    once: true, // whether animation should happen only once
  });
};

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  useEffect(() => {
    initializeAOS();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  );
}

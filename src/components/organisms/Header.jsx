import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/atoms/Container";
import NavigationItem from "@/components/molecules/NavigationItem";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: "홈", path: "/", icon: "Home" },
    { label: "강의", path: "/courses", icon: "BookOpen" },
    { label: "멤버십", path: "/membership", icon: "Crown" },
    { label: "대시보드", path: "/dashboard", icon: "BarChart3" },
    { label: "내 계정", path: "/my-account", icon: "User" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "glass-effect shadow-lg border-b border-gray-200/20" 
        : "bg-transparent"
    )}>
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="GraduationCap" size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">준태스쿨</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.path}
                item={item}
                className="px-3 py-2"
              />
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="메뉴 토글"
          >
            <ApperIcon
              name={isMenuOpen ? "X" : "Menu"}
              size={24}
              className="text-gray-700"
            />
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-white shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                      <ApperIcon name="GraduationCap" size={20} className="text-white" />
                    </div>
                    <span className="text-lg font-bold text-gray-900">준태스쿨</span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <ApperIcon name="X" size={20} className="text-gray-700" />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <nav className="flex-1 p-6">
                  <div className="space-y-2">
                    {navigationItems.map((item) => (
                      <NavigationItem
                        key={item.path}
                        item={item}
                        onClick={() => setIsMenuOpen(false)}
                        className="w-full justify-start px-4 py-3 text-base"
                      />
                    ))}
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
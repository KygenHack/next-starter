import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { scorpion } from "@/images";

// Types and Data
interface NavItemData {
  href: string;
  label: string;
  emoji: string;
  hoverEmoji: string;
}

const navItems: NavItemData[] = [
  { href: "#home", label: "Home", emoji: "🏠", hoverEmoji: "🌟" },
  { href: "#about", label: "About", emoji: "🦂", hoverEmoji: "💫" },
  { href: "#how-to-buy", label: "How to Buy", emoji: "💰", hoverEmoji: "🎯" },
  { href: "#tokenomics", label: "Tokenomics", emoji: "📊", hoverEmoji: "📈" },
];

// Animated logo component
const AnimatedLogo: React.FC = () => {
  return (
    <motion.a 
      href="#"
      className="flex-shrink-0 flex items-center gap-3 group py-2"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-orange-400/40 rounded-xl blur-md 
            group-hover:blur-lg transition-all duration-300"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <Image
          src={scorpion}
          alt="Scorpion World Logo"
          width={40}
          height={40}
          className="relative rounded-xl"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg sm:text-xl font-bold bg-gradient-to-r 
          from-orange-400 to-orange-300 text-transparent bg-clip-text">
          Scorpion World
        </span>
        <motion.span 
          className="text-[10px] sm:text-xs text-blue-100/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          🌟 To The Moon! 🌙
        </motion.span>
      </div>
    </motion.a>
  );
};

// Desktop Navigation Link
const NavLink: React.FC<{
  href: string;
  label: string;
  emoji: string;
  hoverEmoji: string;
  onClick?: () => void;
}> = ({ href, label, emoji, hoverEmoji, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateActive = () => {
      setIsActive(window.location.hash === href);
    };

    window.addEventListener('hashchange', updateActive);
    updateActive();

    return () => window.removeEventListener('hashchange', updateActive);
  }, [href]);

  return (
    <motion.a
      href={href}
      className={`relative group px-4 py-2 rounded-xl text-sm font-medium 
        transition-all duration-300 hidden sm:flex items-center ${
        isActive 
          ? 'text-orange-400 bg-blue-900/40' 
          : 'text-blue-100 hover:text-orange-400 hover:bg-blue-900/20'
      }`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        initial={{ scale: 1 }}
        animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
        className="mr-2"
      >
        {isHovered ? hoverEmoji : emoji}
      </motion.span>
      
      <span>{label}</span>
      
      <motion.span
        className={`ml-1 opacity-50 transition-transform duration-300 ${
          isActive ? 'rotate-90' : 'group-hover:rotate-90'
        }`}
      >
        <ChevronRight className="w-3 h-3" />
      </motion.span>

      {!isActive && (
        <motion.span
          className="absolute inset-0 bg-blue-900/20 rounded-xl z-0"
          initial={{ scale: 0 }}
          animate={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.a>
  );
};

// Mobile Navigation Link
const MobileNavLink: React.FC<{
  href: string;
  label: string;
  emoji: string;
  hoverEmoji: string;
  onClick: () => void;
}> = ({ href, label, emoji, hoverEmoji, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateActive = () => {
      setIsActive(window.location.hash === href);
    };

    window.addEventListener('hashchange', updateActive);
    updateActive();

    return () => window.removeEventListener('hashchange', updateActive);
  }, [href]);

  return (
    <motion.a
      href={href}
      className={`flex items-center justify-between px-4 py-3 rounded-xl 
        text-base font-medium transition-colors ${
        isActive 
          ? 'bg-blue-900/40 text-orange-400' 
          : 'text-blue-100 hover:bg-blue-900/20 hover:text-orange-400'
      }`}
      onClick={(e) => {
        onClick();
        e.preventDefault();
        window.location.hash = href.slice(1);
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="flex items-center gap-3">
        <motion.span
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          {isHovered ? hoverEmoji : emoji}
        </motion.span>
        {label}
      </span>
      <ChevronRight className="w-4 h-4" />
    </motion.a>
  );
};

// Buy Button Component
const BuyButton: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses = `flex items-center justify-center gap-2 px-6 py-3 
    bg-gradient-to-r from-orange-500 to-orange-400 text-blue-950 font-bold 
    rounded-xl shadow-lg group relative overflow-hidden
    ${isMobile ? 'w-full' : 'hidden lg:flex'}`;

  return (
    <motion.a
      href="#buy"
      className={baseClasses}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <span className="flex items-center gap-2 relative z-10">
        <motion.span
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          🚀
        </motion.span>
        <span className="text-sm sm:text-base">Buy $SCORP</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 
          group-hover:-translate-y-0.5 transition-transform" />
      </span>
      
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-orange-400/20 
          to-yellow-400/20"
        initial={{ x: '-100%' }}
        animate={isHovered ? { x: '100%' } : { x: '-100%' }}
        transition={{ duration: 1 }}
      />
    </motion.a>
  );
};

// Main Navbar Component
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu close on navigation
  const closeMenu = () => setIsOpen(false);

  // Handle mobile menu close on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-blue-800/30' 
          : 'bg-transparent'
      }`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Layout */}
        <div className="flex items-center justify-between h-16 sm:h-20">
          <AnimatedLogo />

          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </div>

          <BuyButton />

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex md:hidden items-center justify-center p-2 
              rounded-xl text-orange-400 hover:bg-blue-900/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Toggle menu</span>
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 top-16 bg-slate-950/95 backdrop-blur-xl md:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
                <div className="space-y-2 mb-6">
                  {navItems.map((item) => (
                    <MobileNavLink
                      key={item.href}
                      {...item}
                      onClick={closeMenu}
                    />
                  ))}
                </div>
                
                <div className="pt-2 border-t border-blue-800/30">
                  <BuyButton isMobile />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Twitter, MessageCircle, Github, ExternalLink, Copy, CheckCircle, ArrowUpRight } from 'lucide-react';
import HyperText from './ui/hyper-text';
import AnimatedDescription from './AnimatedDescription';

// Type Definitions
type ChainKey = 'bsc' | 'solana' | 'ton';

interface ChainData {
  address: string;
  name: string;
  icon: string;
}

type ChainDataMap = {
  [K in ChainKey]: ChainData;
}

interface SocialLink {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface TabButtonProps {
  chain: ChainKey;
  isActive: boolean;
  onClick: () => void;
  chainData: ChainDataMap;
}

interface GlowingOrbProps {
  delay: number;
  size: number;
  top: string;
  left: string;
}

interface StatItem {
  label: string;
  value: string;
}

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

// Background Pattern Component
const BackgroundPattern: React.FC = () => (
  <svg
    className="absolute w-full h-full opacity-20"
    xmlns="http://www.w3.org/2000/svg"
    style={{ pointerEvents: 'none' }}
  >
    <defs>
      <pattern
        id="hero-pattern"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        patternTransform="rotate(30)"
      >
        <path
          d="M40 0 L0 0 0 40"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hero-pattern)" />
  </svg>
);

// Border Beam Effect
const BorderBeam: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
    <div className="absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
    <div className="absolute inset-y-0 left-0 h-full w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-50" />
    <div className="absolute inset-y-0 right-0 h-full w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent opacity-50" />
  </div>
);

// Glowing Orb Effect
const GlowingOrb: React.FC<GlowingOrbProps> = ({ delay, size, top, left }) => (
  <motion.div
    className="absolute rounded-full blur-[100px] bg-orange-500/20"
    style={{ width: size, height: size, top, left }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Animated Particle
const FloatingParticle: React.FC = () => {
  const randomPosition = () => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
  });

  const start = randomPosition();
  const end = randomPosition();

  return (
    <motion.div
      className="absolute rounded-full bg-orange-400/30"
      style={{
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
      }}
      initial={{ ...start, opacity: 0 }}
      animate={{ ...end, opacity: [0, 0.5, 0] }}
      transition={{
        duration: Math.random() * 20 + 10,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear',
      }}
    />
  );
};

// Particle System
const ParticleSystem: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 30 }).map((_, index) => (
      <FloatingParticle key={index} />
    ))}
  </div>
);

// Social Link Component
const SocialLink: React.FC<SocialLink> = ({ href, icon, label }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl
      bg-blue-900/20 hover:bg-blue-900/30 text-blue-100 hover:text-orange-400
      transition-all duration-300 backdrop-blur-sm border border-blue-800/30
      hover:border-orange-500/50 text-sm sm:text-base w-full sm:w-auto justify-center
      sm:justify-start relative overflow-hidden"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <span className="relative z-10 flex items-center gap-2">
      {icon}
      <span className="font-medium">{label}</span>
      <ArrowUpRight 
        className="w-4 h-4 opacity-50 transition-transform duration-300 
          group-hover:translate-x-1 group-hover:-translate-y-1" 
      />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-orange-500/0
      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
  </motion.a>
);

// Tab Button Component
const TabButton: React.FC<TabButtonProps> = ({ chain, isActive, onClick, chainData }) => (
  <motion.button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
      ${isActive 
        ? 'bg-orange-500 text-blue-950' 
        : 'bg-blue-900/20 text-blue-100 hover:bg-blue-900/40'}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {chainData[chain].icon} {chainData[chain].name}
  </motion.button>
);

// Main Hero Component
const Hero: React.FC = () => {
  const controls = useAnimation();
  const y = useMotionValue(50);
  const opacity = useTransform(y, [50, 0], [0, 1]);
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeChain, setActiveChain] = useState<ChainKey>('bsc');

  const chainData: ChainDataMap = {
    bsc: {
      address: "0x1234567890123456789012345678901234567890",
      name: "BSC",
      icon: "🟡"
    },
    solana: {
      address: "CK23mTXMtqm8VzuN1B1dUZGwmgT5tqPEZsYs6pQeaU4N",
      name: "Solana",
      icon: "🟣"
    },
    ton: {
      address: "EQBvW8Z5huBkMJYdnfAEM5JqTNkuWX3diqYENkWsIL0XggGG",
      name: "TON",
      icon: "💎"
    }
  };

  const socialLinks: SocialLink[] = [
    { 
      href: "https://twitter.com/ScorpionWorld",
      icon: <Twitter className="w-5 h-5" />,
      label: "Twitter"
    },
    {
      href: "https://t.me/ScorpionWorld",
      icon: <MessageCircle className="w-5 h-5" />,
      label: "Telegram"
    },
    {
      href: "https://github.com/ScorpionWorld",
      icon: <Github className="w-5 h-5" />,
      label: "Github"
    }
  ];

  const statsData: StatItem[] = [
    { label: 'Total Supply', value: '1,000,000,000' },
    { label: 'Holders', value: '2,547' },
    { label: 'Market Cap', value: '$1.2M' },
    { label: 'Liquidity', value: '$500K' }
  ];

  const featuresData: FeatureItem[] = [
    {
      icon: "🚀",
      title: "Cross-Chain",
      description: "Seamlessly operate across BSC, Solana, and TON networks"
    },
    {
      icon: "💎",
      title: "Community Driven",
      description: "Strong community governance and collaborative development"
    },
    {
      icon: "🔒",
      title: "Security First",
      description: "Audited smart contracts and secure infrastructure"
    }
  ];

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(chainData[activeChain].address).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]
        from-blue-900/20 via-slate-900 to-slate-950" />
      <BackgroundPattern />
      <ParticleSystem />
      <GlowingOrb delay={0} size={300} top="10%" left="10%" />
      <GlowingOrb delay={2} size={400} top="60%" left="80%" />
      <BorderBeam />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 py-20 sm:py-32 
        space-y-6 sm:space-y-8 w-full max-w-4xl mx-auto">
        {/* Welcome Badge */}
        <motion.div
          className="inline-block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 
            text-orange-400 text-sm font-medium inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
                bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            Welcome to the Future of DeFi
          </span>
        </motion.div>

      {/* Title with Enhanced Gradient and Animation */}
      <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight 
            tracking-tight bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 
            text-transparent bg-clip-text px-4 sm:px-8 max-w-full
            drop-shadow-[0_0_10px_rgba(251,146,60,0.2)]"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            ease: "easeOut"
          }}
        >
          🦂 Scorpion World
        </motion.h1>

        {/* Description Component with proper spacing */}
        <div className="mt-2 sm:mt-4">
          <AnimatedDescription />
        </div>


        
        {/* Description
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-blue-100/90 font-medium leading-relaxed
            px-4 sm:px-8 max-w-[90%] sm:max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
           
          Harness the potential of <HyperText
      className="text-orange-400 font-semibold"
      text="$SCORP"/>. 
          Earn, trade, and unlock limitless possibilities in the Web3 and Telegram ecosystem.
        </motion.p> */}

        {/* Smart Contract Section */}
        <motion.div
          className="w-full max-w-[90%] sm:max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-blue-900/20 backdrop-blur-xl p-4 sm:p-6 rounded-2xl 
            border border-blue-800/30">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-orange-400 font-bold text-sm sm:text-base flex items-center gap-2">
                  Smart Contract Address
                  <span className="text-blue-300 text-xs sm:text-sm font-normal px-2 py-1 
                    rounded-full bg-blue-500/10">
                    Verified ✓
                  </span>
                </h3>
              </div>
              
              {/* Chain Selection Tabs */}
              <div className="flex flex-wrap gap-2">
                {(Object.keys(chainData) as ChainKey[]).map((chain) => (
                  <TabButton
                    key={chain}
                    chain={chain}
                    isActive={activeChain === chain}
                    onClick={() => setActiveChain(chain)}
                    chainData={chainData}
                  />
                ))}
              </div>

              {/* Address Display and Copy Button */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 
                sm:gap-0 bg-blue-950/50 rounded-xl overflow-hidden border border-blue-800/30">
                <input
                  type="text"
                  value={chainData[activeChain].address}
                  readOnly
                  className="bg-transparent text-blue-100 p-3 outline-none text-xs sm:text-sm 
                  font-mono w-full truncate"
              />
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-2 bg-orange-500 text-blue-950 
                  px-4 py-3 font-bold hover:bg-orange-400 transition-colors duration-300 
                  text-sm sm:text-base w-full sm:w-auto whitespace-nowrap"
              >
                {isCopied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Buy Button */}
      <motion.div
        className="relative group w-full sm:w-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <motion.a
          href="#buy"
          className="inline-block w-[90%] sm:w-auto px-8 sm:px-12 py-4 sm:py-5 
            bg-gradient-to-r from-orange-500 to-orange-400 text-blue-950 text-lg sm:text-xl 
            font-bold rounded-lg shadow-lg transition duration-300 transform 
            hover:translate-y-[-2px] relative z-10"
        >
          Buy $SCORP Now
        </motion.a>
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-orange-600 
            rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-300 
            group-hover:duration-200"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
        />
      </motion.div>

      {/* Social Links
      <motion.div
        className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-[90%] 
          sm:w-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        {socialLinks.map((link, index) => (
          <SocialLink key={index} {...link} />
        ))}
      </motion.div> */}

      {/* Stats Section
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-[90%] sm:max-w-2xl mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 rounded-xl
              bg-blue-900/20 backdrop-blur-sm border border-blue-800/30"
          >
            <span className="text-orange-400 font-bold text-lg sm:text-xl mb-1">
              {stat.value}
            </span>
            <span className="text-blue-100/80 text-sm">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div> */}

      {/* Features Section
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-[90%] sm:max-w-4xl mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-6 rounded-xl
              bg-blue-900/20 backdrop-blur-sm border border-blue-800/30
              hover:border-orange-500/30 transition-colors duration-300"
          >
            <span className="text-4xl mb-4">{feature.icon}</span>
            <h3 className="text-orange-400 font-bold text-lg mb-2">
              {feature.title}
            </h3>
            <p className="text-blue-100/80 text-sm text-center">
              {feature.description}
            </p>
          </div>
        ))}
      </motion.div> */}

      {/* Footer Note */}
      <motion.p
        className="text-blue-100/60 text-sm max-w-[90%] sm:max-w-2xl text-center mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        $SCORP is a community-driven project. Always DYOR and invest responsibly.
      </motion.p>
    </div>
  </div>
);
};

export default Hero;
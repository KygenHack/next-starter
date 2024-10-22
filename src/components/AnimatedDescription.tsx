import React from 'react';
import { motion } from 'framer-motion';
import HyperText from './ui/hyper-text';

const AnimatedDescription = () => {
  const parts = {
    prefix: "Harness the potential",
    connector: "of",
    ticker: "$SCORP",
    tagline: "Earn, trade, and unlock limitless possibilities",
    ecosystem: "in the Web3 and Telegram ecosystem."
  };
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.4,
        duration: 0.8,
      },
    },
  };

  const fadeUpAnimation = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(5px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  const tickerAnimation = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
      filter: "blur(5px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: 0.6,
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full max-w-[95%] md:max-w-3xl lg:max-w-4xl mx-auto
        px-3 sm:px-6 md:px-8"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {/* Main Content Container */}
      <div className="flex flex-col space-y-4 sm:space-y-6 md:space-y-8">
        {/* First Line Container */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center 
            text-center sm:text-left space-y-2 sm:space-y-0"
        >
          {/* Prefix and Connector */}
          <motion.div className="flex flex-wrap justify-center sm:justify-start items-baseline 
            gap-x-2 sm:gap-x-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl 
            tracking-tight leading-tight font-medium">
            <motion.span
              className="text-blue-100/90 whitespace-nowrap"
              variants={fadeUpAnimation}
            >
              {parts.prefix}
            </motion.span>
            
            <motion.span
              className="text-blue-100/80"
              variants={fadeUpAnimation}
            >
              {parts.connector}
            </motion.span>
          </motion.div>

          {/* Ticker */}
          <motion.div
            className="sm:ml-2 md:ml-3"
            variants={tickerAnimation}
          >
            <HyperText
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold 
                bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400
                bg-[size:200%] bg-clip-text text-transparent 
                hover:scale-105 transition-transform duration-300"
              text={parts.ticker}
            />
          </motion.div>
        </motion.div>

        {/* Tagline Section */}
        <div className="flex flex-col space-y-3 sm:space-y-4 text-center max-w-[95%] sm:max-w-[90%] mx-auto">
          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-medium 
              text-blue-100/80 leading-relaxed tracking-wide"
            variants={fadeUpAnimation}
            custom={1}
          >
            {parts.tagline}
          </motion.p>
          
          <motion.p
            className="text-base sm:text-lg md:text-xl 
              text-blue-100/70 leading-relaxed tracking-normal"
            variants={fadeUpAnimation}
            custom={2}
          >
            {parts.ecosystem}
          </motion.p>
        </div>

        {/* Gradient Separator */}
        <motion.div 
          className="relative w-full max-w-[80%] sm:max-w-xs mx-auto h-px"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r 
            from-transparent via-orange-500/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r 
            from-transparent via-orange-500/20 to-transparent 
            animate-pulse" />
        </motion.div>
      </div>

      {/* Optional Mobile-Only Spacing */}
      <div className="h-4 sm:h-0" />
    </motion.div>
  );
};

export default AnimatedDescription;
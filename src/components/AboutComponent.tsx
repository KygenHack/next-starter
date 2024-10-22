import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ArrowUpRight, 
  Shield, 
  Users, 
  Zap, 
  PiggyBank,
  Sparkles,
  ChevronRight,
  Lock,
  Rocket,
  FileText
} from 'lucide-react';

// Dynamic Background Shapes
const BackgroundShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute w-96 h-96 bg-orange-500/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          top: ["-20%", "-18%", "-20%"],
          left: ["-10%", "-8%", "-10%"]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
          bottom: ["-20%", "-18%", "-20%"],
          right: ["-10%", "-8%", "-10%"]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

// Floating Particle System
const FloatingParticle: React.FC = () => {
  const randomPosition = () => ({
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
  });

  const start = randomPosition();
  const end = randomPosition();

  return (
    <motion.div
      className="absolute rounded-full bg-orange-400/20"
      style={{
        width: Math.random() * 4 + 2,
        height: Math.random() * 4 + 2,
      }}
      initial={{
        ...start,
        opacity: 0,
      }}
      animate={{
        ...end,
        opacity: [0, 0.5, 0],
      }}
      transition={{
        duration: Math.random() * 20 + 10,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear',
      }}
    />
  );
};

// Particle Container
const ParticleSystem = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 20 }).map((_, index) => (
      <FloatingParticle key={index} />
    ))}
  </div>
);

// Enhanced Feature Card
const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}> = ({
  title,
  description,
  icon,
  delay
}) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Hover Glow Effect */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl opacity-0 
          group-hover:opacity-20 blur transition-all duration-300 group-hover:blur-md"
        animate={inView ? { scale: [0.8, 1] } : {}}
      />

      {/* Card Content */}
      <div className="relative bg-blue-900/20 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border 
        border-blue-800/30 hover:border-orange-500/30 transition-all duration-300 h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-gradient-to-br from-orange-400/20 to-orange-400/5 rounded-xl 
            backdrop-blur-sm group-hover:bg-orange-400/30 transition-colors duration-300">
            {icon}
          </div>
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 45 }}
          >
            <ArrowUpRight className="text-orange-400" size={20} />
          </motion.div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-orange-400 to-orange-300 mb-3">{title}</h3>
        
        <p className="text-blue-100/70 leading-relaxed">{description}</p>
        
        <div className="mt-6 pt-6 border-t border-blue-800/30">
          <motion.button
            className="flex items-center gap-2 text-sm text-orange-400 opacity-0 
              group-hover:opacity-100 transition-all duration-300"
            whileHover={{ x: 4 }}
          >
            Learn More
            <ChevronRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Stats Counter Animation
const AnimatedCounter: React.FC<{ value: number; suffix: string }> = ({ value, suffix }) => {
  const [ref, inView] = useInView({
    threshold: 1,
    triggerOnce: true
  });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      className="font-bold text-3xl sm:text-4xl text-orange-400"
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { 
          opacity: 1,
          transition: { duration: 0.2 }
        } : {}}
      >
        {value.toLocaleString()}
      </motion.span>
      {suffix}
    </motion.span>
  );
};

// Stats Section
const StatsSection: React.FC = () => {
  const stats = [
    { value: 12000, suffix: "+", label: "Community Members" },
    { value: 5, suffix: "M+", label: "Trading Volume" },
    { value: 4, suffix: "K+", label: "Holders" },
    { value: 10, suffix: "+", label: "Partners" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-blue-900/20 backdrop-blur-xl p-4 rounded-xl border border-blue-800/30
            flex flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          <span className="text-blue-100/60 text-sm mt-2">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Main About Section Component
const AboutSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const features = [
    {
      title: "Community-Driven",
      description: "Join a vibrant community of Scorpion enthusiasts shaping the future of decentralized finance.",
      icon: <Users className="w-6 h-6 text-orange-400" />
    },
    {
      title: "Innovative DeFi",
      description: "Experience cutting-edge decentralized finance features powered by the $SCORP token.",
      icon: <Zap className="w-6 h-6 text-orange-400" />
    },
    {
      title: "Secure & Transparent",
      description: "Built on blockchain technology ensuring security, transparency, and trust in every transaction.",
      icon: <Shield className="w-6 h-6 text-orange-400" />
    },
    {
      title: "Rewarding Ecosystem",
      description: "Earn rewards, participate in governance, and grow your assets within the Scorpion World ecosystem.",
      icon: <PiggyBank className="w-6 h-6 text-orange-400" />
    }
  ];

  return (
    <section className="relative bg-slate-950 py-32 px-4 overflow-hidden min-h-screen 
      flex items-center" id="about">
      <BackgroundShapes />
      <ParticleSystem />
      
      <div className="relative max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
              bg-orange-500/10 border border-orange-500/20 text-orange-400 
              text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              About Us
            </span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 
              via-orange-300 to-yellow-400 text-transparent bg-clip-text mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Revolutionizing DeFi with 🦂
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Scorpion World is not just another meme coin – it's a revolution in the crypto space.
            We combine the fun and excitement of meme culture with serious DeFi capabilities.
          </motion.p>
        </div>

        {/* Stats Section */}
        <StatsSection />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              delay={0.2 * index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.a
            href="#"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r 
              from-orange-500 to-orange-400 rounded-xl font-bold text-lg text-blue-950 
              shadow-lg transition-all duration-300 hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-5 h-5" />
            Read Our Whitepaper
            <ChevronRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>

          <motion.a
            href="#"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl 
              bg-blue-900/20 text-orange-400 border border-blue-800/30 
              hover:border-orange-500/30 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Lock className="w-5 h-5" />
            View Audit Report
            <ArrowUpRight className="group-hover:translate-x-1 
              group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
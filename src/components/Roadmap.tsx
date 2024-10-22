import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, CheckCircle, Clock, Sparkles, Rocket, Target, Flag, Star, Lock, ArrowRight } from 'lucide-react';

interface Milestone {
  title: string;
  description: string;
  completed?: boolean;
}

interface RoadmapPhase {
  id: number;
  title: string;
  emoji: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  period: string;
  icon: React.ElementType;
  milestones: Milestone[];
}

const roadmapData: RoadmapPhase[] = [
  {
    id: 1,
    title: "Launch Phase",
    emoji: "🚀",
    status: 'completed',
    period: "Q1 2024",
    icon: Rocket,
    milestones: [
      {
        title: "Website Launch",
        description: "Launch of official Scorpion World website and social media channels",
        completed: true
      },
      {
        title: "Smart Contract Development",
        description: "Development and audit of $SCORP token smart contract",
        completed: true
      },
      {
        title: "Community Building",
        description: "Initial community building and social media presence establishment",
        completed: true
      },
      {
        title: "Token Presale",
        description: "Successful completion of private and public token sale rounds",
        completed: true
      }
    ]
  },
  {
    id: 2,
    title: "Growth Phase",
    emoji: "📈",
    status: 'in-progress',
    period: "Q2 2024",
    icon: Target,
    milestones: [
      {
        title: "DEX Listing",
        description: "Listing on major decentralized exchanges",
        completed: true
      },
      {
        title: "Marketing Campaign",
        description: "Launch of global marketing campaign",
        completed: false
      },
      {
        title: "Staking Platform",
        description: "Launch of $SCORP staking platform with attractive APY",
        completed: false
      },
      {
        title: "Partnership Announcements",
        description: "Strategic partnerships with key crypto projects",
        completed: false
      }
    ]
  },
  {
    id: 3,
    title: "Expansion Phase",
    emoji: "🌍",
    status: 'upcoming',
    period: "Q3 2024",
    icon: Flag,
    milestones: [
      {
        title: "Mobile App Beta",
        description: "Launch of Scorpion World mobile app beta version",
        completed: false
      },
      {
        title: "NFT Collection",
        description: "Launch of exclusive Scorpion World NFT collection",
        completed: false
      },
      {
        title: "Cross-chain Bridge",
        description: "Implementation of cross-chain bridge functionality",
        completed: false
      },
      {
        title: "Governance Platform",
        description: "Launch of community governance platform",
        completed: false
      }
    ]
  },
  {
    id: 4,
    title: "Ecosystem Phase",
    emoji: "🎮",
    status: 'upcoming',
    period: "Q4 2024",
    icon: Star,
    milestones: [
      {
        title: "GameFi Integration",
        description: "Launch of Play-to-Earn gaming platform",
        completed: false
      },
      {
        title: "DeFi Suite",
        description: "Launch of comprehensive DeFi products suite",
        completed: false
      },
      {
        title: "Metaverse Development",
        description: "Development of Scorpion World metaverse",
        completed: false
      },
      {
        title: "Global Expansion",
        description: "Further expansion into global markets",
        completed: false
      }
    ]
  }
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'in-progress':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      default:
        return <Lock className="w-4 h-4" />;
    }
  };

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles()}`}>
      {getStatusIcon()}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Roadmap: React.FC = () => {
  const [activePhase, setActivePhase] = useState<number>(1);

  const PhaseCard: React.FC<{ phase: RoadmapPhase; isActive: boolean; onClick: () => void }> = ({ 
    phase, 
    isActive,
    onClick 
  }) => {
    const Icon = phase.icon;
    const completedMilestones = phase.milestones.filter(m => m.completed).length;
    const totalMilestones = phase.milestones.length;
    const progress = (completedMilestones / totalMilestones) * 100;
    
    return (
      <motion.div
        className={`relative cursor-pointer transition-all duration-300 ${
          isActive 
            ? 'col-span-full lg:col-span-8' 
            : 'col-span-full sm:col-span-6 lg:col-span-4'
        }`}
        onClick={onClick}
        layout
      >
        <motion.div 
          className={`h-full rounded-2xl border transition-all duration-300 ${
            isActive
              ? 'bg-blue-900/20 backdrop-blur-xl border-orange-500/20'
              : 'bg-blue-900/10 backdrop-blur-xl border-blue-800/30 hover:border-orange-500/20'
          }`}
          layout
        >
          {/* Card Header */}
          <div className="p-6 border-b border-blue-800/30">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${
                  isActive ? 'bg-orange-500/20' : 'bg-blue-900/20'
                }`}>
                  <Icon className={`w-5 h-5 ${
                    isActive ? 'text-orange-400' : 'text-blue-400'
                  }`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-100 flex items-center gap-2">
                    {phase.emoji} {phase.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <StatusBadge status={phase.status} />
                    <span className="text-blue-100/60 text-sm">{phase.period}</span>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isActive ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="hidden sm:block"
              >
                <ChevronRight className="w-5 h-5 text-orange-400" />
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-blue-950/50 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-orange-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className="text-blue-100/60">Progress</span>
              <span className="text-orange-400 font-medium">{completedMilestones}/{totalMilestones} Completed</span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6">
            {isActive ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {phase.milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-blue-950/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`mt-1 p-1 rounded-full ${
                      milestone.completed 
                        ? 'bg-green-500/20' 
                        : 'bg-blue-900/20'
                    }`}>
                      {milestone.completed ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-orange-400">{milestone.title}</h4>
                      <p className="text-sm text-blue-100/70">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-blue-100 font-medium">Key Milestones</h4>
                  <button className="text-orange-400 text-sm flex items-center gap-1 hover:gap-2 transition-all duration-300">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {phase.milestones.slice(0, 2).map((milestone, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm text-blue-100/70"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        milestone.completed ? 'bg-green-400' : 'bg-blue-400'
                      }`} />
                      {milestone.title}
                    </div>
                  ))}
                  {phase.milestones.length > 2 && (
                    <div className="text-sm text-blue-100/50 pl-4">
                      +{phase.milestones.length - 2} more milestones
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section className="relative bg-slate-950 py-32 px-4 overflow-hidden" id="roadmap">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-48 -right-48" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4 inline-block">
              Our Journey
            </span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 text-transparent bg-clip-text mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Roadmap to Success 🚀
          </motion.h2>

          <motion.p
            className="text-blue-100/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Follow our journey as we revolutionize the crypto space with $SCORP
          </motion.p>
        </div>

        {/* Mobile Phase Navigation */}
        <div className="lg:hidden flex overflow-x-auto gap-2 mb-6 pb-2 -mx-4 px-4 scrollbar-hide">
          {roadmapData.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                activePhase === phase.id
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'bg-blue-900/20 text-blue-100/70'
              }`}
            >
              {phase.emoji} {phase.title}
            </button>
          ))}
        </div>

        {/* Roadmap Grid */}
        <motion.div 
          className="grid grid-cols-12 gap-6"
          layout
        >
          {roadmapData.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              isActive={activePhase === phase.id}
              onClick={() => setActivePhase(phase.id)}
            />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <a
          href="#"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/10 rounded-xl text-orange-400 hover:bg-orange-500/20 transition-colors duration-300 group"
        >
          <Sparkles className="w-5 h-5" />
          View Detailed Roadmap
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </motion.div>
    </div>
  </section>
);
};

export default Roadmap;
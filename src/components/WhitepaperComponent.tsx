import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, ChevronRight, ExternalLink } from 'lucide-react';

interface WhitepaperSection {
  title: string;
  content: string | React.ReactNode;
}

interface TokenDistribution {
  category: string;
  percentage: number;
  description: string;
}

interface RoadmapItem {
  quarter: string;
  title: string;
  points: string[];
}

const tokenDistribution: TokenDistribution[] = [
  {
    category: "Public Sale",
    percentage: 40,
    description: "Available for public trading and community participation"
  },
  {
    category: "Liquidity Pool",
    percentage: 30,
    description: "Locked for market stability and trading depth"
  },
  {
    category: "Development",
    percentage: 15,
    description: "Reserved for ongoing platform development and improvements"
  },
  {
    category: "Marketing",
    percentage: 10,
    description: "Allocated for marketing initiatives and partnerships"
  },
  {
    category: "Team",
    percentage: 5,
    description: "Vested over 24 months for team incentivization"
  }
];

const roadmapItems: RoadmapItem[] = [
  {
    quarter: "Q1 2024",
    title: "Foundation Phase",
    points: [
      "Initial DEX offering on BSC",
      "Community building initiatives",
      "Strategic partnership developments",
      "Marketing campaign launch"
    ]
  },
  {
    quarter: "Q2 2024",
    title: "Expansion Phase",
    points: [
      "Solana bridge deployment",
      "New exchange listings",
      "Enhanced security audits",
      "Ecosystem partnerships"
    ]
  },
  {
    quarter: "Q3 2024",
    title: "Integration Phase",
    points: [
      "TON network integration",
      "Cross-chain functionality expansion",
      "Advanced features rollout",
      "Community governance implementation"
    ]
  },
  {
    quarter: "Q4 2024",
    title: "Scaling Phase",
    points: [
      "Ecosystem expansion",
      "New product launches",
      "Enhanced DeFi features",
      "Global marketing campaign"
    ]
  }
];

const WhitepaperComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const ProgressBar: React.FC<{ percentage: number }> = ({ percentage }) => (
    <div className="w-full h-2 bg-blue-900/30 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full bg-orange-500 rounded-full"
      />
    </div>
  );

  const tabData = {
    overview: {
      icon: <FileText className="w-5 h-5" />,
      label: "Overview"
    },
    tokenomics: {
      icon: <ChevronRight className="w-5 h-5" />,
      label: "Tokenomics"
    },
    roadmap: {
      icon: <ChevronRight className="w-5 h-5" />,
      label: "Roadmap"
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-lg
          bg-blue-900/30 text-orange-400 font-bold hover:bg-blue-900/50 
          transition-colors duration-300 border border-orange-500/30
          hover:border-orange-500/50"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <FileText className="w-5 h-5" />
        Read Whitepaper
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 
              bg-black/80 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={handleContentClick}
              className="relative w-full max-w-5xl max-h-[85vh] bg-slate-950 rounded-xl 
                border border-blue-800/30 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b 
                border-blue-800/30 bg-blue-900/20 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-orange-400" />
                  <h2 className="text-xl sm:text-2xl font-bold text-orange-400">
                    Scorpion World Whitepaper
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                      bg-orange-500 text-blue-950 font-medium text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg bg-blue-900/30 hover:bg-blue-900/50 
                      text-blue-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              <div className="flex h-[calc(85vh-76px)]">
                {/* Sidebar */}
                <div className="w-64 border-r border-blue-800/30 p-4 space-y-2
                  bg-blue-900/10 hidden sm:block">
                  {Object.entries(tabData).map(([key, { icon, label }]) => (
                    <motion.button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg
                        text-left transition-colors ${activeTab === key
                          ? 'bg-orange-500 text-blue-950'
                          : 'text-blue-100 hover:bg-blue-900/30'}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {icon}
                      <span className="font-medium">{label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                  {activeTab === 'overview' && (
                    <div className="space-y-8">
                      <section>
                        <h3 className="text-2xl font-bold text-orange-400 mb-4">
                          Introduction
                        </h3>
                        <p className="text-blue-100/90 leading-relaxed">
                          Scorpion World represents a revolutionary approach to decentralized
                          finance, combining cross-chain functionality with community governance
                          and innovative tokenomics. Our mission is to create a seamless,
                          secure, and user-friendly DeFi ecosystem that operates across
                          multiple blockchain networks.
                        </p>
                      </section>

                      <section>
                        <h3 className="text-2xl font-bold text-orange-400 mb-4">
                          Vision & Mission
                        </h3>
                        <div className="bg-blue-900/20 p-6 rounded-xl space-y-4">
                          <p className="text-blue-100/90 leading-relaxed">
                            Our vision is to become the leading cross-chain DeFi platform,
                            bridging the gap between different blockchain ecosystems and
                            providing users with unparalleled access to decentralized
                            financial services.
                          </p>
                          <div className="space-y-2">
                            <h4 className="text-lg font-semibold text-orange-400">
                              Core Objectives:
                            </h4>
                            <ul className="list-disc list-inside text-blue-100/90 space-y-2">
                              <li>Enable seamless cross-chain transactions</li>
                              <li>Foster community-driven governance</li>
                              <li>Ensure maximum security and transparency</li>
                              <li>Drive innovation in DeFi space</li>
                            </ul>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}

                  {activeTab === 'tokenomics' && (
                    <div className="space-y-8">
                      <section>
                        <h3 className="text-2xl font-bold text-orange-400 mb-4">
                          Token Distribution
                        </h3>
                        <div className="space-y-6">
                          {tokenDistribution.map((item, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-blue-100 font-medium">
                                  {item.category}
                                </span>
                                <span className="text-orange-400 font-bold">
                                  {item.percentage}%
                                </span>
                              </div>
                              <ProgressBar percentage={item.percentage} />
                              <p className="text-blue-100/70 text-sm">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </section>

                      <section className="bg-blue-900/20 p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-orange-400 mb-4">
                          Token Utility
                        </h3>
                        <ul className="space-y-4 text-blue-100/90">
                          <li className="flex items-start gap-3">
                            <ChevronRight className="w-5 h-5 text-orange-400 mt-0.5" />
                            <div>
                              <span className="font-medium">Governance</span>
                              <p className="text-sm text-blue-100/70 mt-1">
                                Token holders can participate in protocol decisions
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <ChevronRight className="w-5 h-5 text-orange-400 mt-0.5" />
                            <div>
                              <span className="font-medium">Staking Rewards</span>
                              <p className="text-sm text-blue-100/70 mt-1">
                                Earn passive income through staking programs
                              </p>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <ChevronRight className="w-5 h-5 text-orange-400 mt-0.5" />
                            <div>
                              <span className="font-medium">Fee Reduction</span>
                              <p className="text-sm text-blue-100/70 mt-1">
                                Hold tokens to reduce platform fees
                              </p>
                            </div>
                          </li>
                        </ul>
                      </section>
                    </div>
                  )}

                  {activeTab === 'roadmap' && (
                    <div className="space-y-8">
                      {roadmapItems.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-blue-900/20 p-6 rounded-xl space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-orange-400">
                              {item.quarter}
                            </h3>
                            <span className="text-blue-100/70 text-sm">
                              {item.title}
                            </span>
                          </div>
                          <ul className="space-y-3">
                            {item.points.map((point, pointIndex) => (
                              <li key={pointIndex} className="flex items-start gap-3">
                                <ChevronRight 
                                  className="w-5 h-5 text-orange-400 mt-0.5" 
                                />
                                <span className="text-blue-100/90">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhitepaperComponent;
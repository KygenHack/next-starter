import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { 
  Coins, 
  Vote, 
  Wallet, 
  Gift, 
  Shield, 
  Zap, 
  ChevronRight, 
  FileText,
  Lock,
  Sparkles,
  Check,
  MessageCircle,
  Github,
  X,
  Download,
  ExternalLink,
  BookOpen,
  RefreshCcw,
  Target,
  Award
} from 'lucide-react';

// Types
interface WhitepaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TokenomicsDataItem {
  name: string;
  value: number;
  color: string;
  description: string;
  lockPeriod?: string;
}

interface TokenUtility {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface SecurityMeasure {
  title: string;
  items: string[];
}

interface TabData {
  id: string;
  label: string;
  icon: React.ElementType;
}

// Data
const tokenomicsData: TokenomicsDataItem[] = [
  { 
    name: 'Community Airdrop & Charity', 
    value: 30, 
    color: '#EC4899',
    description: 'For community incentives and rewards',
    lockPeriod: 'Released per program'
  },
  { 
    name: 'Public Sale', 
    value: 30, 
    color: '#F97316', 
    description: 'Available for public token sale participants',
    lockPeriod: 'No Lock'
  },
  { 
    name: 'Marketing', 
    value: 20, 
    color: '#8B5CF6',
    description: 'Reserved for marketing initiatives',
    lockPeriod: '6 months vesting'
  },
  { 
    name: 'Liquidity Pool', 
    value: 10, 
    color: '#3B82F6', 
    description: 'Locked for trading liquidity',
    lockPeriod: '12 months lock'
  },
  { 
    name: 'Team & Advisors', 
    value: 5, 
    color: '#14B8A6',
    description: 'Vested over 24 months',
    lockPeriod: '24 months vesting'
  },
  { 
    name: 'Development', 
    value: 5, 
    color: '#6366F1',
    description: 'Future development fund',
    lockPeriod: '12 months vesting'
  },
];

const totalSupply = 150000000;

const securityMeasures: SecurityMeasure[] = [
  {
    title: "Smart Contract Security",
    items: [
      "Multi-signature wallet implementation",
      "Time-locked contracts for team tokens",
      "Emergency pause functionality"
    ]
  },
  {
    title: "Liquidity Protection",
    items: [
      "Initial liquidity locked for 12 months",
      "Anti-whale mechanisms implemented",
      "Gradual token release schedule"
    ]
  }
];

const tokenUtilities: TokenUtility[] = [
  {
    title: "Governance",
    description: "Vote on important protocol decisions and proposed changes",
    icon: Vote
  },
  {
    title: "Staking Rewards",
    description: "Earn passive income by staking your $SCORP tokens",
    icon: Gift
  },
  {
    title: "Access Control",
    description: "Unlock premium features within the ecosystem",
    icon: Shield
  },
  {
    title: "Trading Benefits",
    description: "Enjoy reduced trading fees on our DEX",
    icon: Zap
  },
  {
    title: "NFT Integration",
    description: "Use $SCORP for NFT transactions",
    icon: Wallet
  },
  {
    title: "Liquidity Mining",
    description: "Participate in liquidity mining programs",
    icon: Coins
  }
];

const tabs: TabData[] = [
  { id: 'overview', label: 'Overview', icon: BookOpen },
  { id: 'tokenomics', label: 'Tokenomics', icon: RefreshCcw },
  { id: 'roadmap', label: 'Roadmap', icon: Target },
  { id: 'team', label: 'Team', icon: Award }
];

// Helper Components
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-blue-950/90 backdrop-blur-xl p-3 rounded-xl border border-blue-800/30 shadow-xl">
        <div className="text-orange-400 font-bold mb-1">{data.name}</div>
        <div className="text-blue-100">
          {data.value}% ({(totalSupply * data.value / 100).toLocaleString()} $SCORP)
        </div>
        {data.lockPeriod && (
          <div className="text-blue-100/70 text-sm mt-1">
            <Lock className="w-3 h-3 inline mr-1" />
            {data.lockPeriod}
          </div>
        )}
      </div>
    );
  }
  return null;
};

const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, value } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="#fff" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-sm font-medium"
    >
      {`${value}%`}
    </text>
  );
};

// Tab Content Components
const OverviewContent: React.FC = () => (
  <div className="space-y-8">
    <section>
      <h3 className="text-2xl font-bold text-orange-400 mb-4">Introduction</h3>
      <p className="text-blue-100/90 leading-relaxed">
        Scorpion World represents a revolutionary approach to decentralized finance,
        combining cross-chain functionality with community governance and innovative
        tokenomics. Our mission is to create a seamless, secure, and user-friendly DeFi
        ecosystem that operates across multiple blockchain networks.
      </p>
    </section>

    <section className="bg-blue-900/20 p-6 rounded-xl">
      <h3 className="text-xl font-bold text-orange-400 mb-4">Key Features</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            title: "Cross-Chain Compatibility",
            description: "Seamless operation across BSC, Solana, and TON networks"
          },
          {
            title: "Community Governance",
            description: "Democratic decision-making through token-based voting"
          },
          {
            title: "Advanced Security",
            description: "Multi-layered security measures and regular audits"
          },
          {
            title: "Innovative DeFi Solutions",
            description: "Cutting-edge financial products and services"
          }
        ].map((feature, index) => (
          <div key={index} className="p-4 bg-blue-950/30 rounded-xl">
            <h4 className="text-orange-400 font-semibold mb-2">{feature.title}</h4>
            <p className="text-blue-100/70 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>

    <section>
      <h3 className="text-2xl font-bold text-orange-400 mb-4">Vision & Mission</h3>
      <div className="space-y-4">
        <p className="text-blue-100/90 leading-relaxed">
          Our vision is to become the leading cross-chain DeFi platform, bridging
          the gap between different blockchain ecosystems and providing users with
          unparalleled access to decentralized financial services.
        </p>
        <div className="bg-blue-900/20 p-6 rounded-xl">
          <h4 className="text-lg font-bold text-orange-400 mb-3">Core Objectives</h4>
          <ul className="space-y-3">
            {[
              "Build a robust cross-chain infrastructure",
              "Foster community-driven development",
              "Ensure maximum security and transparency",
              "Drive innovation in the DeFi space"
            ].map((objective, index) => (
              <li key={index} className="flex items-start gap-3">
                <ChevronRight className="w-5 h-5 text-orange-400 mt-0.5" />
                <span className="text-blue-100/90">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  </div>
);

const TokenomicsContent: React.FC = () => (
  <div className="space-y-8">
    {/* Token Distribution Chart */}
    <div className="bg-blue-900/20 backdrop-blur-xl p-6 rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-orange-400">Token Distribution</h3>
        <span className="px-3 py-1 bg-orange-500/10 rounded-full text-orange-400 text-sm">
          Total: {totalSupply.toLocaleString()} $SCORP
        </span>
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-full max-w-[400px]">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={tokenomicsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {tokenomicsData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    stroke="rgba(0,0,0,0.1)"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Supply', value: `${totalSupply.toLocaleString()} $SCORP` },
          { label: 'Network', value: 'Cross Chain (BSC, Solana, TON)' },
          { label: 'Token Type', value: 'Utility & Governance' }
        ].map((stat, index) => (
          <div key={index} className="flex justify-between p-4 bg-blue-950/30 rounded-xl">
            <span className="text-orange-400">{stat.label}:</span>
            <span className="text-blue-100">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Token Details */}
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-orange-400">Token Allocation Details</h3>
      {tokenomicsData.map((item, index) => (
        <div 
          key={index}
          className="flex items-center gap-4 p-4 bg-blue-950/30 rounded-xl group 
            hover:bg-blue-950/50 transition-colors duration-300"
        >
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: item.color }}
          />
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <span className="text-orange-400 font-semibold">{item.name}</span>
              <span className="text-blue-100">({item.value}%)</span>
            </div>
            <p className="text-blue-100/70 text-sm mt-1">{item.description}</p>
            {item.lockPeriod && (
              <div className="flex items-center gap-1 text-blue-100/50 text-xs mt-1">
                <Lock className="w-3 h-3" />
                {item.lockPeriod}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>

    {/* Token Utility */}
    <div>
      <h3 className="text-2xl font-bold text-orange-400 mb-6">Token Utility</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tokenUtilities.map((utility, index) => (
          <div
            key={index}
            className="group bg-blue-900/20 backdrop-blur-xl p-4 rounded-xl border 
              border-blue-800/30 hover:border-orange-500/30 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 
                transition-colors duration-300">
                <utility.icon className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h4 className="text-orange-400 font-bold mb-2">{utility.title}</h4>
                <p className="text-blue-100/80 text-sm">{utility.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RoadmapContent: React.FC = () => (
  <div className="space-y-8">
    {[
      {
        phase: "Phase 1 - Foundation",
        quarter: "Q1 2024",
        items: [
          "Initial DEX offering on BSC",
          "Community building initiatives",
          "Strategic partnership developments",
          "Marketing campaign launch"
        ]
      },
      {
        phase: "Phase 2 - Expansion",
        quarter: "Q2 2024",
        items: [
          "Solana bridge deployment",
          "New exchange listings",
          "Enhanced security audits",
          "Ecosystem partnerships"
        ]
      },
      {
        phase: "Phase 3 - Integration",
        quarter: "Q3 2024",
        items: [
          "TON network integration",
          "Cross-chain functionality expansion",
          "Advanced features rollout",
          "Community governance implementation"
        ]
      },
      {
        phase: "Phase 4 - Scaling",
        quarter: "Q4 2024",
        items: [
          "Ecosystem expansion",
          "New product launches",
          "Enhanced DeFi features",
          "Global marketing campaign"
        ]
      }
    ].map((phase, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-blue-900/20 p-6 rounded-xl space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-orange-400">
            {phase.phase}
          </h3>
          <span className="px-3 py-1 bg-orange-500/10 rounded-full text-orange-400 text-sm">
            {phase.quarter}
          </span>
        </div>
        <ul className="space-y-3">
          {phase.items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start gap-3">
              <ChevronRight className="w-5 h-5 text-orange-400 mt-0.5" />
              <span className="text-blue-100/90">{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
);

const TeamContent: React.FC = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        {
          name: "Alex Thompson",
          role: "Chief Executive Officer",
          description: "10+ years in blockchain and DeFi",
          image: "/api/placeholder/100/100"
        },
        {
          name: "Sarah Chen",
          role: "Chief Technology Officer",
          description: "Former senior developer at major blockchain projects",
          image: "/api/placeholder/100/100"
        },
        {
          name: "Marcus Williams",
          role: "Head of Security",
          description: "Cybersecurity expert with focus on DeFi",
          image: "/api/placeholder/100/100"
        },
        {
          name: "Elena Rodriguez",
          role: "Community Manager",
          description: "5+ years in crypto community management",
          image: "/api/placeholder/100/100"
        },
        {
          name: "David Kim",
          role: "Lead Developer",
          description: "Smart contract and cross-chain specialist",
          image: "/api/placeholder/100/100"
        },
        {
          name: "Laura Martinez",
          role: "Marketing Director",
          description: "Experienced in blockchain marketing strategies",
          image: "/api/placeholder/100/100"
        }
      ].map((member, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-blue-900/20 p-6 rounded-xl border border-blue-800/30 
            hover:border-orange-500/30 transition-all duration-300"
        >
          <div className="flex items-start gap-4">
            <img
              src={member.image}
              alt={member.name}
              className="w-16 h-16 rounded-full bg-blue-900/30"
            />
            <div>
              <h4 className="text-orange-400 font-bold">{member.name}</h4>
              <div className="text-blue-100 text-sm font-medium mb-2">{member.role}</div>
              <p className="text-blue-100/70 text-sm">{member.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// Main Component
const WhitepaperComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Render tab content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewContent />;
      case 'tokenomics':
        return <TokenomicsContent />;
      case 'roadmap':
        return <RoadmapContent />;
      case 'team':
        return <TeamContent />;
      default:
        return <OverviewContent />;
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
              className="relative w-full max-w-6xl max-h-[85vh] bg-slate-950 rounded-xl 
                border border-blue-800/30 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b 
                border-blue-800/30 bg-blue-900/20 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-orange-400" />
                  <h2 className="text-xl sm:text-2xl font-bold text-orange-400">
                    Explore Whitepaper
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
                  {tabs.map(tab => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg
                        text-left transition-colors ${activeTab === tab.id
                          ? 'bg-orange-500 text-blue-950'
                          : 'text-blue-100 hover:bg-blue-900/30'}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <tab.icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6">
                  {renderTabContent()}
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
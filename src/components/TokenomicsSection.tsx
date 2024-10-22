import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
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
  Check
} from 'lucide-react';

// Types
interface TokenomicsDataItem {
  name: string;
  value: number;
  color: string;
  description: string;
  lockPeriod?: string;
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

const totalSupply = 150000000; // 1 billion $SCORP

const securityMeasures = [
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

const tokenUtilities = [
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

// Subcomponents
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

const UtilityCard: React.FC<{ 
  icon: React.ElementType; 
  title: string; 
  description: string;
  index: number;
}> = ({
  icon: Icon,
  title,
  description,
  index
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
    className="group bg-blue-900/20 backdrop-blur-xl p-6 rounded-xl border border-blue-800/30 hover:border-orange-500/30 transition-all duration-300"
    whileHover={{ scale: 1.02 }}
  >
    <div className="flex items-start gap-4">
      <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors duration-300">
        <Icon className="w-6 h-6 text-orange-400" />
      </div>
      <div>
        <h4 className="text-orange-400 font-bold mb-2">{title}</h4>
        <p className="text-blue-100/80">{description}</p>
      </div>
    </div>
  </motion.div>
);

const TokenomicsSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const totalTokens = totalSupply.toLocaleString();
  const publicSaleTokens = (totalSupply * 0.4).toLocaleString();
  const liquidityTokens = (totalSupply * 0.2).toLocaleString();

  return (
    <section className="relative bg-slate-950 py-32 px-4 overflow-hidden" id="tokenomics">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4 inline-block">
              Tokenomics
            </span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 text-transparent bg-clip-text mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Token Distribution & Utility
          </motion.h2>

          <motion.p
            className="text-blue-100/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Discover how $SCORP tokens are distributed and their utility within our ecosystem
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Enhanced Chart Section */}
          <motion.div
            ref={ref}
            className="bg-blue-900/20 backdrop-blur-xl p-8 rounded-2xl border border-blue-800/30"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-orange-400">Token Distribution</h3>
              <span className="px-3 py-1 bg-orange-500/10 rounded-full text-orange-400 text-sm">
                Total: {totalTokens} $SCORP
              </span>
            </div>

            {/* Chart Container with Stats */}
            <div className="relative">
              {/* Centered Chart */}
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

              {/* Key Statistics
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-blue-950/30 p-4 rounded-xl">
                  <div className="text-sm text-blue-100/70 mb-1">Public Sale Allocation</div>
                  <div className="text-lg font-bold text-orange-400">{publicSaleTokens} $SCORP</div>
                  <div className="text-sm text-blue-100/70">30% of Total Supply</div>
                </div>
                <div className="bg-blue-950/30 p-4 rounded-xl">
                  <div className="text-sm text-blue-100/70 mb-1">Liquidity Pool</div>
                  <div className="text-lg font-bold text-orange-400">{liquidityTokens} $SCORP</div>
                  <div className="text-sm text-blue-100/70">10% of Total Supply</div>
                </div>
              </div> */}

               {/* Key Stats */}
               <div className="mt-8 space-y-4">
                <div className="flex justify-between p-4 bg-blue-950/30 rounded-xl">
                  <span className="text-orange-400">Total Supply:</span>
                  <span className="text-blue-100 font-mono">{totalSupply.toLocaleString()} $SCORP</span>
                </div>
                <div className="flex justify-between p-4 bg-blue-950/30 rounded-xl">
                  <span className="text-orange-400">Network:</span>
                  <span className="text-blue-100">Binance Smart Chain (BEP-20)</span>
                </div>
                <div className="flex justify-between p-4 bg-blue-950/30 rounded-xl">
                  <span className="text-orange-400">Token Type:</span>
                  <span className="text-blue-100">Utility & Governance</span>
                </div>
              </div>

              {/* Security Measures */}
              <div className="mt-6 space-y-4">
                {securityMeasures.map((section, index) => (
                  <div key={index} className="p-4 bg-blue-950/30 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Shield className="w-4 h-4 text-orange-400" />
                      <h4 className="text-orange-400 font-semibold">{section.title}</h4>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-2 text-sm text-blue-100/70">
                          <Check className="w-4 h-4 text-orange-400 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Token Details Section */}
          <motion.div
            className="bg-blue-900/20 backdrop-blur-xl p-8 rounded-2xl border border-blue-800/30"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-orange-400 mb-6">Token Details</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {tokenomicsData.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-4 bg-blue-950/30 rounded-xl group hover:bg-blue-950/50 transition-colors duration-300"
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
                          {item.lockPeriod}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

             

              {/* Additional Info Box */}
              <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-orange-400 mt-1" />
                  <div>
                    <h4 className="text-orange-400 font-semibold mb-2">Token Launch Details</h4>
                    <ul className="space-y-2 text-sm text-blue-100/70">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                        Fair launch with anti-bot measures
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                        No team tokens at launch
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                        Liquidity locked for 12 months
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Token Utility Section */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {tokenUtilities.map((utility, index) => (
            <UtilityCard
              key={index}
              icon={utility.icon}
              title={utility.title}
              description={utility.description}
              index={index}
            />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl font-bold text-lg text-blue-950 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileText className="w-5 h-5" />
            Read Full Tokenomics Paper
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.a>

          {/* Additional Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-blue-100/70 hover:text-orange-400 text-sm flex items-center gap-1 transition-colors duration-300">
              <Shield className="w-4 h-4" />
              View Audit Report
            </a>
            <a href="#" className="text-blue-100/70 hover:text-orange-400 text-sm flex items-center gap-1 transition-colors duration-300">
              <Lock className="w-4 h-4" />
              View Lock Proof
            </a>
            <a href="#" className="text-blue-100/70 hover:text-orange-400 text-sm flex items-center gap-1 transition-colors duration-300">
              <Wallet className="w-4 h-4" />
              Token Contract
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TokenomicsSection;
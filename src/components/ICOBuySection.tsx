import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Wallet, Clock, CreditCard, HelpCircle, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';
import TypingAnimation from './ui/typing-animation';

// Mock data
const icoData = {
  totalTokens: 150000000,
  soldTokens: 0,
  tokenPrice: 0.00008,
  softCap: 5000000,
  hardCap: 20000000,
  minPurchase: 100,
  maxPurchase: 10000,
  startDate: new Date('2024-11-01T00:00:00Z'),
  endDate: new Date('2024-12-31T23:59:59Z'),
};

const GlowingBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
    <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" />
  </div>
);

const TokenSaleProgress: React.FC<{ timeLeft: string }> = ({ timeLeft }) => {
  const progress = (icoData.soldTokens / icoData.totalTokens) * 100;
  
  return (
    <motion.div 
      className="relative bg-blue-900/20 backdrop-blur-xl p-8 rounded-2xl border border-blue-800/30"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <Clock className="w-6 h-6" />
        Token Sale Progress
      </h3>
      
      <div className="mb-6">
        <div className="relative w-full bg-blue-950/50 rounded-full h-4 overflow-hidden">
          <motion.div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <div className="flex justify-between mt-2 text-blue-100">
          <span>{progress.toFixed(1)}% Sold</span>
          <span>{icoData.soldTokens.toLocaleString()} / {icoData.totalTokens.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-950/30 p-4 rounded-xl">
          <p className="text-orange-400 font-semibold">Soft Cap</p>
          <p className="text-blue-100 text-lg font-bold">${icoData.softCap.toLocaleString()}</p>
        </div>
        <div className="bg-blue-950/30 p-4 rounded-xl">
          <p className="text-orange-400 font-semibold">Hard Cap</p>
          <p className="text-blue-100 text-lg font-bold">${icoData.hardCap.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
        <div className="flex items-center gap-2 text-orange-400">
          <Clock className="w-5 h-5" />
          <span className="font-bold">{timeLeft}</span>
          <span className="text-sm">until end</span>
        </div>
      </div>
    </motion.div>
  );
};

const BuyInterface: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('bnb');

  const handleBuy = async () => {
    console.log(`Buying ${amount} $SCORP with ${paymentMethod}`);
  };

  return (
    <motion.div 
      className="relative bg-blue-900/20 backdrop-blur-xl p-8 rounded-2xl border border-blue-800/30"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <Wallet className="w-6 h-6" />
        Buy $SCORP Tokens
      </h3>

      <div className="space-y-6">
        <div>
          <label htmlFor="amount" className="block text-orange-400 font-semibold mb-2">Amount of $SCORP</label>
          <div className="relative">
            <input 
              type="number" 
              id="amount" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 bg-blue-950/50 text-blue-100 rounded-xl border border-blue-800/50 focus:outline-none focus:border-orange-500/50 transition-colors"
              placeholder="Enter amount"
              min={icoData.minPurchase}
              max={icoData.maxPurchase}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 font-medium">$SCORP</span>
          </div>
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-orange-400 font-semibold mb-2">Payment Method</label>
          <div className="relative">
            <select 
              id="paymentMethod" 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 bg-blue-950/50 text-blue-100 rounded-xl border border-blue-800/50 focus:outline-none focus:border-orange-500/50 transition-colors appearance-none"
            >
              <option value="bnb">BNB</option>
              <option value="busd">BUSD</option>
              <option value="usdt">USDT</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400" />
          </div>
        </div>

        <div className="bg-blue-950/30 p-4 rounded-xl">
          <p className="text-blue-100 flex justify-between">
            <span>Estimated cost:</span>
            <span className="text-orange-400 font-bold">
              ${amount ? (parseFloat(amount) * icoData.tokenPrice).toFixed(2) : '0.00'}
            </span>
          </p>
        </div>

        <motion.button
          onClick={handleBuy}
          className="relative w-full group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
          <div className="relative flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-400 text-blue-950 px-8 py-4 rounded-xl font-bold text-lg">
            Buy Now
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

const TokenSaleDetails: React.FC = () => {
  const details = [
    { label: "Token Price", value: `$${icoData.tokenPrice}`, icon: <CreditCard className="w-5 h-5" /> },
    { label: "Min Purchase", value: `${icoData.minPurchase} $SCORP`, icon: <ArrowUpRight className="w-5 h-5" /> },
    { label: "Max Purchase", value: `${icoData.maxPurchase} $SCORP`, icon: <ArrowUpRight className="w-5 h-5" /> },
    { label: "Start Date", value: icoData.startDate.toLocaleDateString(), icon: <Clock className="w-5 h-5" /> },
    { label: "End Date", value: icoData.endDate.toLocaleDateString(), icon: <Clock className="w-5 h-5" /> },
    { label: "Accepted Currencies", value: "BNB, BUSD, USDT, TON", icon: <Wallet className="w-5 h-5" /> },
  ];

  return (
    <motion.div 
      className="mt-12 bg-blue-900/20 backdrop-blur-xl p-8 rounded-2xl border border-blue-800/30"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-orange-400 mb-6">Token Sale Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {details.map((detail, index) => (
          <div key={index} className="bg-blue-950/30 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-orange-400 mb-2">
              {detail.icon}
              <p className="font-semibold">{detail.label}</p>
            </div>
            <p className="text-blue-100">{detail.value}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const BuyInstructions: React.FC = () => {
  const steps = [
    { title: "Connect Your Wallet", content: "Click the 'Connect Wallet' button and select your preferred wallet (MetaMask, Trust Wallet, etc.)." },
    { title: "Ensure Sufficient Funds", content: "Make sure you have enough BNB, BUSD, or USDT in your wallet to purchase $SCORP tokens and cover gas fees." },
    { title: "Enter Purchase Amount", content: "In the 'Buy $SCORP Tokens' section, enter the amount of $SCORP you wish to purchase." },
    { title: "Select Payment Method", content: "Choose your preferred payment method from the dropdown menu (BNB, BUSD, or USDT)." },
    { title: "Review Transaction", content: "Double-check the amount and estimated cost before proceeding." },
    { title: "Confirm Purchase", content: "Click the 'Buy Now' button to initiate the transaction. Your wallet will prompt you to confirm." },
    { title: "Transaction Approval", content: "Approve the transaction in your wallet. Ensure you have enough gas for the transaction." },
    { title: "Await Confirmation", content: "Wait for the transaction to be confirmed on the blockchain. This usually takes a few minutes." },
    { title: "Receive Tokens", content: "Once confirmed, the $SCORP tokens will be sent to your wallet." },
  ];

  return (
    <motion.div 
      className="mt-12 bg-blue-900/20 backdrop-blur-xl p-8 rounded-2xl border border-blue-800/30"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <HelpCircle className="w-6 h-6" />
        How to Buy $SCORP Tokens
      </h3>
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            className="relative pl-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="absolute left-0 top-0 w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center">
              <span className="text-orange-400 text-sm font-bold">{index + 1}</span>
            </div>
            <h4 className="text-orange-400 font-semibold mb-1">{step.title}</h4>
            <p className="text-blue-100">{step.content}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20">
        <p className="text-blue-100 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-400" />
          Need help? Join our <a href="#" className="text-orange-400 hover:underline">Telegram community</a> for assistance!
        </p>
      </div>
    </motion.div>
  );
};

const ICOBuySection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const distance = icoData.endDate.getTime() - now.getTime();
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft('ICO Ended');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-slate-950 py-32 px-4 overflow-hidden" id="ico-buy">
      <GlowingBackground />
      
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-4 inline-block">
              Token Sale
            </span>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 text-transparent bg-clip-text mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join the $SCORP Revolution 🚀
          </motion.h2>

          <motion.p
            className="text-blue-100/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <TypingAnimation
           duration={50}
      className="text-lg md:text-xl text-blue-100/80"
      text="Be part of the future of DeFi by participating in our token sale. Early supporters get exclusive benefits and community privileges."
      />
          </motion.p>
        </div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-blue-900/20 backdrop-blur-sm p-4 rounded-xl border border-blue-800/30">
            <div className="text-orange-400 text-sm">Token Price</div>
            <div className="text-blue-100 text-xl font-bold">${icoData.tokenPrice}</div>
          </div>
          <div className="bg-blue-900/20 backdrop-blur-sm p-4 rounded-xl border border-blue-800/30">
            <div className="text-orange-400 text-sm">Total Supply</div>
            <div className="text-blue-100 text-xl font-bold">{(icoData.totalTokens / 1000000).toFixed(1)}M</div>
          </div>
          <div className="bg-blue-900/20 backdrop-blur-sm p-4 rounded-xl border border-blue-800/30">
            <div className="text-orange-400 text-sm">Tokens Sold</div>
            <div className="text-blue-100 text-xl font-bold">{(icoData.soldTokens / 1000000).toFixed(1)}M</div>
          </div>
          <div className="bg-blue-900/20 backdrop-blur-sm p-4 rounded-xl border border-blue-800/30">
            <div className="text-orange-400 text-sm">Time Remaining</div>
            <div className="text-blue-100 text-xl font-bold">{timeLeft}</div>
          </div>
        </motion.div>

        {/* Main Sale Interface */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TokenSaleProgress timeLeft={timeLeft} />
          <BuyInterface />
        </div>

        <TokenSaleDetails />
        <BuyInstructions />

        {/* Additional Resources */}
        <motion.div 
          className="mt-16 text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="p-6 bg-blue-900/20 backdrop-blur-xl rounded-2xl border border-blue-800/30 max-w-2xl mx-auto">
            <h4 className="text-orange-400 font-bold mb-4 flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Important Resources
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="#"
                className="flex items-center gap-2 px-4 py-2 bg-blue-950/50 rounded-xl text-blue-100 hover:text-orange-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Whitepaper
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center gap-2 px-4 py-2 bg-blue-950/50 rounded-xl text-blue-100 hover:text-orange-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Tokenomics
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center gap-2 px-4 py-2 bg-blue-950/50 rounded-xl text-blue-100 hover:text-orange-400 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Audit Report
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          <p className="text-blue-100/80">
            Have questions? Check out our{' '}
            <a href="#" className="text-orange-400 hover:underline">
              Detailed ICO Guide
            </a>
            {' '}or{' '}
            <a href="#" className="text-orange-400 hover:underline">
              join our community
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ICOBuySection;
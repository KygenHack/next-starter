import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowUpRight, Wallet, Clock, CreditCard, HelpCircle, AlertCircle, CheckCircle, ChevronDown, Lock, LogOut } from 'lucide-react';
import TypingAnimation from './ui/typing-animation';
import { ConnectButton, MediaRenderer, darkTheme, useActiveAccount, useActiveWallet, useAutoConnect, useConnect, useConnectModal, useDisconnect } from "thirdweb/react";
import { client } from '@/app/client';
import { createWallet, inAppWallet } from "thirdweb/wallets";

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
  const account = useActiveAccount();
  const connectedWallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  const [payAmount, setPayAmount] = useState<string>('');
  const [receiveAmount, setReceiveAmount] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState('BNB');

  // Token price from your icoData
  const tokenPrice = 0.00008;

  // Calculate receive amount based on pay amount
  useEffect(() => {
    if (payAmount) {
      const tokens = parseFloat(payAmount) / tokenPrice;
      setReceiveAmount(tokens.toFixed(2));
    } else {
      setReceiveAmount('');
    }
  }, [payAmount]);

  // Handle buy action
  const handleBuy = async () => {
    if (!account || !connectedWallet) return;
    
    // Add your purchase transaction logic here
    alert(`Processing purchase of ${receiveAmount} $SCORP tokens for ${payAmount} ${selectedCurrency}`);
  };

  // Handle disconnect
  const handleDisconnect = async () => {
    if (connectedWallet) {
      await disconnect(connectedWallet);
      setPayAmount('');
      setReceiveAmount('');
    }
  };

  const currencies = ['BNB', 'BUSD', 'USDT'];

  return (
    <motion.div 
      className="relative bg-blue-900/20 backdrop-blur-xl p-8 rounded-2xl border border-blue-800/30"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-orange-400 flex items-center gap-2">
          <Wallet className="w-6 h-6" />
          Buy $SCORP Tokens
        </h3>
        {account && connectedWallet && (
          <motion.button
            onClick={handleDisconnect}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </motion.button>
        )}
      </div>

      <div className="space-y-6">
        {!account || !connectedWallet ? (
          // Wallet Connection Required State
          <div className="bg-blue-950/30 p-6 rounded-xl border border-blue-800/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-orange-500/10 rounded-full">
                <Lock className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-orange-400">Wallet Required</h4>
                <p className="text-blue-100/80 text-sm">Connect your wallet to start buying tokens</p>
              </div>
            </div>
            
            <CustomWallets />
          </div>
        ) : (
          // Connected State - Purchase Interface
          <div>
            {/* Wallet Status Banner */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 font-medium">Wallet Connected</span>
                </div>
                <span className="text-sm text-blue-100 font-medium">
                  {account.address.slice(0, 6)}...{account.address.slice(-4)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
              {/* Payment Input */}
              <div className="bg-blue-950/30 p-4 rounded-xl">
                <p className="text-sm text-blue-100/80 mb-1">You Pay</p>
                <div className="flex items-center gap-2">
                  <input 
                    type="number"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    placeholder="0.0"
                    min="0"
                    step="0.01"
                    className="w-full bg-transparent text-lg font-bold text-blue-100 outline-none"
                  />
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="bg-blue-900/50 text-blue-100 px-2 py-1 rounded-lg outline-none"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Receive Amount */}
              <div className="bg-blue-950/30 p-4 rounded-xl">
                <p className="text-sm text-blue-100/80 mb-1">You Receive</p>
                <div className="flex items-center gap-2">
                  <input 
                    type="text"
                    value={receiveAmount ? `${receiveAmount} $SCORP` : ''}
                    readOnly
                    placeholder="0.0 $SCORP"
                    className="w-full bg-transparent text-lg font-bold text-blue-100 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Buy Button */}
            <button 
              onClick={handleBuy}
              disabled={!payAmount || parseFloat(payAmount) <= 0}
              className={`w-full py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                ${payAmount && parseFloat(payAmount) > 0 
                  ? 'bg-orange-500 text-white hover:bg-orange-600' 
                  : 'bg-orange-500/20 text-orange-400 cursor-not-allowed'}`}
            >
              Buy $SCORP Tokens
            </button>
          </div>
        )}

        {/* Additional Info */}
        <div className="flex items-center justify-between text-sm text-blue-100/60 mt-4">
          <span>Min Purchase: 100 $SCORP</span>
          <a href="#" className="flex items-center gap-1 hover:text-orange-400">
            Need Help?
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Rate Info */}
      <div className="mt-4 p-3 bg-blue-950/30 rounded-xl">
        <p className="text-sm text-blue-100/80">
          Current Rate: 1 $SCORP = ${tokenPrice}
        </p>
      </div>
    </motion.div>
  );
};

//Customize Wallets Displayed in ConnectButton
function CustomWallets() {
  //Create an array of recommended wallets
  const recommendedWallets = [
      createWallet("com.coinbase.wallet"),
  ];
  //Create an array of wallets to display
  const wallets = [
    inAppWallet({
      auth: {
        options: ["telegram", "guest", "passkey"],
      },
    }),
      createWallet("com.coinbase.wallet"),
      createWallet("io.metamask"),
      createWallet("org.uniswap"),
      createWallet("com.exodus"),
      createWallet("com.robinhood.wallet")
  ];

  return (
      <div className="flex flex-col items-center mb-20 md:mb-20">
          <ConnectButton
              client={client}
              //Display custom wallets
              wallets={wallets}
              //Display recommended wallets
              recommendedWallets={recommendedWallets}
              connectButton={{ label: "Connect Wallet" }}
              connectModal={{
                size: "compact",
                showThirdwebBranding: false,
                
              }}
          />

          
      </div>
  )
}

// Create a custom login flow with a single wallet
function SingleWalletFlow () {
  // Get active account and wallet
  const account = useActiveAccount();
  const connectedWallet = useActiveWallet();

  // Get connect and disconnect functions
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
      <div className="flex flex-col items-center mb-20 md:mb-20">
          <p  className="text-zinc-300 text-base mb-4 md:mb-4">Single Wallet</p>
          {account && connectedWallet ? (
              <button
                  className="bg-red-500 text-white-400 px-4 py-2 rounded-md"
                  onClick={() => disconnect(connectedWallet)}
              >Disconnect</button>
          ) : (
              <button
                  className="bg-blue-500 text-white-400 px-4 py-2 rounded-md"
                  onClick={async () => connect(async () => {
                      const wallet = createWallet("io.metamask");
                      await wallet.connect({ client: client });
                      return wallet;
                  })}
              >Connect with Metamask</button>
          )}
      </div>
  )
}


// Create a custom button that opens the Connect Modal
function ConnecModalButton() {
  // Get active account and wallet
  const account = useActiveAccount();
  const connectedWallet = useActiveWallet();

  // Get disconnect functions
  const { disconnect } = useDisconnect();

  // Get connect modal function
  const { connect } = useConnectModal();

  // Handle login with connect modal
  async function handleLogin() {
      const wallet = await connect({ client: client });
  }

  // Auto connect wallet on page load
  const { data: autoConnected } = useAutoConnect({
      client: client,
      wallets: [
        inAppWallet({
          auth: {
            options: ["telegram", "guest", "passkey"],
          },
        }),
        createWallet("com.coinbase.wallet"),
        createWallet("io.metamask"),
        createWallet("org.uniswap"),
        createWallet("com.exodus"),
        createWallet("com.robinhood.wallet")
      ],
      onConnect(wallet) {
          console.log("Auto connected wallet:", wallet);
      },
  });

  return (
      <div className="flex flex-col items-center mb-20 md:mb-20">
          {account && connectedWallet ? (
            <> 
          
            <p className="text-zinc-300 text-base mb-4 md:mb-4">{account?.address}</p>
            <button
            className="bg-red-500 text-white-400 px-4 py-2 rounded-md"
            onClick={() => disconnect(connectedWallet)}
        >Disconnect</button>
        </>     
          ) : (
              <>
                  <button
                      className="bg-green-500 text-white-400 px-4 py-2 rounded-md"
                      onClick={handleLogin}
                  >Connect Wallet</button>
              </>
          )}
      </div>
  )
}

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
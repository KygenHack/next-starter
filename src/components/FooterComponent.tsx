import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Twitter, 
  MessageCircle, 
  Globe, 
  Globe2, 
  BookOpen,
  ArrowUpRight,
  ChevronRight,
  Mail,
  ExternalLink,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { scorpion } from "@/images";

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label }) => (
  <motion.a
    href={href}
    className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-900/30 text-blue-100 hover:text-orange-400 hover:bg-blue-900/50 transition-all duration-300 backdrop-blur-sm"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    <Icon className="h-5 w-5" />
  </motion.a>
);

const FooterLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <motion.a
    href={href}
    className="group flex items-center gap-1 text-blue-100/80 hover:text-orange-400 transition-colors duration-300"
    whileHover={{ x: 4 }}
  >
    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
    {children}
  </motion.a>
);

const Footer: React.FC = () => {
  const socialLinks: SocialLinkProps[] = [
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: MessageCircle, label: 'Telegram' },
    { href: '#', icon: Globe, label: 'Discord' },
    { href: '#', icon: Globe2, label: 'Website' },
    { href: '#', icon: BookOpen, label: 'Documentation' },
  ];

  const quickLinks = [
    'Home',
    'About Us',
    'How to Buy',
    'Tokenomics',
    'Roadmap'
  ];

  const resources = [
    'Whitepaper',
    'Documentation',
    'Smart Contract',
    'Token Audit',
    'Press Kit'
  ];

  const supportLinks = [
    'Help Center',
    'Community Guidelines',
    'FAQs',
    'Bug Bounty',
    'Contact Us'
  ];

  const legalLinks = [
    'Privacy Policy',
    'Terms of Service',
    'Disclaimer'
  ];

  return (
    <footer className="relative bg-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -top-48 -left-48" />
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-48 -right-48" />
      </div>

      <div className="relative border-b border-blue-800/30 py-2">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="bg-blue-900/20 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl border border-blue-800/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Content Section */}
            <div className="text-center lg:text-left">
              <motion.h3 
                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 
                  text-transparent bg-clip-text mb-2 sm:mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Stay Updated with $SCORP
              </motion.h3>
              <motion.p 
                className="text-sm sm:text-base text-blue-100/80 max-w-md mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Subscribe to our newsletter for the latest updates, announcements, and exclusive offers.
              </motion.p>
            </div>

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <form className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-blue-950/50 rounded-xl border border-blue-800/50 
                      text-blue-100 placeholder-blue-400/50 focus:outline-none focus:border-orange-500/50
                      text-sm sm:text-base transition-colors duration-300"
                  />
                  {/* Mobile Submit Button */}
                  <motion.button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 sm:hidden
                      w-8 h-8 flex items-center justify-center rounded-lg
                      bg-gradient-to-r from-orange-500 to-orange-400"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowRight className="w-4 h-4 text-blue-950" />
                  </motion.button>
                </div>

                {/* Desktop Submit Button */}
                <motion.button
                  type="submit"
                  className="hidden sm:flex items-center justify-center gap-2 px-6 py-3 
                    bg-gradient-to-r from-orange-500 to-orange-400 rounded-xl text-blue-950 
                    font-bold text-sm sm:text-base whitespace-nowrap hover:shadow-lg
                    transition-shadow duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                  <Mail className="w-4 h-4" />
                </motion.button>
              </form>

              {/* Form Note */}
              <p className="text-xs text-blue-100/60 mt-2 text-center sm:text-left">
                By subscribing, you agree to receive $SCORP updates. Unsubscribe at any time.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Toast - Optional */}
      <motion.div
        className="fixed bottom-4 right-4 px-4 py-2 bg-green-500/90 text-white 
          rounded-lg shadow-lg backdrop-blur-sm hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <p className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-4 h-4" />
          Successfully subscribed!
        </p>
      </motion.div>
    </div>

      {/* Main Footer Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-400 blur-sm rounded-full" />
                <Image
                  src={scorpion}
                  alt="Scorpion World Logo"
                  width={48}
                  height={48}
                  className="relative rounded-full"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 text-transparent bg-clip-text">
                Scorpion World
              </span>
            </div>
            <p className="text-blue-100/80 mb-6">
              Join the revolution in meme coins. Empowering the crypto community with innovation and rewards.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <SocialLink
                  key={social.label}
                  {...social}
                />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-orange-400 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <FooterLink href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}>
                    {link}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-orange-400 mb-6">Resources</h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource}>
                  <FooterLink href="#">
                    {resource}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-orange-400 mb-6">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((item) => (
                <li key={item}>
                  <FooterLink href="#">
                    {item}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Download Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold text-orange-400 mb-6">Community</h3>
            <div className="space-y-4">
              <motion.a
                href="#"
                className="flex items-center gap-2 px-4 py-3 bg-blue-900/30 rounded-xl text-blue-100 hover:text-orange-400 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Globe className="w-5 h-5" />
                <span>Join Discord</span>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </motion.a>
              <motion.a
                href="#"
                className="flex items-center gap-2 px-4 py-3 bg-blue-900/30 rounded-xl text-blue-100 hover:text-orange-400 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>Join Telegram</span>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-blue-800/30">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-blue-100/60 text-sm">
              © {new Date().getFullYear()} Scorpion World. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {legalLinks.map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="text-blue-100/60 hover:text-orange-400 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
'use client'

import AboutSection from '@/components/AboutComponent';
import Footer from '@/components/FooterComponent';
import Hero from '@/components/HeroComponents';
import ICOBuySection from '@/components/ICOBuySection';
import Navbar from '@/components/NavBar';
import Roadmap from '@/components/Roadmap';
import TokenomicsSection from '@/components/TokenomicsSection';


export default function Home() {
  return (
     <>
     <Navbar />
     <Hero />
     <AboutSection/>
     <ICOBuySection/>
     <Roadmap/>
     <TokenomicsSection/>
     <Footer/>
     </>
  );
}

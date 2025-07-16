import React from 'react';
import Hero from '../../shared/hero/Hero';
import AboutTrampolim from '../../shared/about/AboutTrampolim';
import ImpactMetrics from '@/components/shared/impact-metrics/ImpactMetrics';
import Benefits from '@/components/shared/benefits/Benefits';
import FAQ from '@/components/shared/FAQ/FAQ';
import Partners from '@/components/shared/partners/Partners';
import Footer from '@/components/shared/footer/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="h-auto">
      <Hero />
      <AboutTrampolim />
      <ImpactMetrics />
      <Benefits />
      <FAQ/>
      <Partners/>
      <Footer/>
    </div>
  );
};

export default LandingPage;
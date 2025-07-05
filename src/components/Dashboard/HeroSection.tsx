import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { TrendingUpIcon } from '@heroicons/react/24/outline';

interface HeroSectionProps {
  totalValue: number;
  totalGrowth: number;
  isLoggedIn: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  totalValue,
  totalGrowth,
  isLoggedIn,
}) => {
  return (
    <div className="relative overflow-hidden">
      <div className="gradient-bg rounded-2xl p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-4">
            <SparklesIcon className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Fireworks</h1>
          </div>
          
          <p className="text-lg text-orange-100 mb-8 max-w-2xl">
            Your intelligent DeFi yield optimizer. Our smart agent automatically reallocates 
            your assets to the highest-yielding pools, maximizing your returns while you sleep.
          </p>
          
          {isLoggedIn ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-orange-100">Total Portfolio Value</h3>
                  <TrendingUpIcon className="h-5 w-5 text-green-300" />
                </div>
                <p className="text-3xl font-bold">${totalValue.toLocaleString()}</p>
                <p className="text-sm text-green-300 mt-1">
                  +${totalGrowth.toLocaleString()} ({((totalGrowth / (totalValue - totalGrowth)) * 100).toFixed(2)}%)
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-sm font-medium text-orange-100 mb-2">Current Best Pool</h3>
                <p className="text-2xl font-bold">Aave USDC</p>
                <p className="text-sm text-orange-100 mt-1">
                  <span className="text-green-300 font-semibold">12.4% APR</span> • Auto-allocated
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md">
              <h3 className="text-lg font-semibold mb-2">Get Started</h3>
              <p className="text-orange-100 text-sm">
                Connect your INTMAX wallet to start earning optimized yields on your crypto assets.
              </p>
            </div>
          )}
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-20">
          <div className="w-32 h-32 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 opacity-10">
          <div className="w-48 h-48 bg-white rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};
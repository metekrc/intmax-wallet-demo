import React from 'react';
import { 
  CurrencyDollarIcon, 
  TrendingUpIcon, 
  ClockIcon,
  FireIcon 
} from '@heroicons/react/24/outline';

interface StatsCardsProps {
  totalDeposited: number;
  totalEarned: number;
  avgAPR: number;
  activeStrategies: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  totalDeposited,
  totalEarned,
  avgAPR,
  activeStrategies,
}) => {
  const stats = [
    {
      name: 'Total Deposited',
      value: `$${totalDeposited.toLocaleString()}`,
      icon: CurrencyDollarIcon,
      change: '+12.5%',
      changeType: 'positive' as const,
    },
    {
      name: 'Total Earned',
      value: `$${totalEarned.toLocaleString()}`,
      icon: TrendingUpIcon,
      change: '+8.2%',
      changeType: 'positive' as const,
    },
    {
      name: 'Average APR',
      value: `${avgAPR.toFixed(1)}%`,
      icon: ClockIcon,
      change: '+2.1%',
      changeType: 'positive' as const,
    },
    {
      name: 'Active Strategies',
      value: activeStrategies.toString(),
      icon: FireIcon,
      change: '+1',
      changeType: 'positive' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.name} className="card hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-primary-50 p-3 rounded-lg">
                  <Icon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`ml-2 text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
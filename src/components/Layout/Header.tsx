import React from 'react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { FireIcon } from '@heroicons/react/24/solid';

interface HeaderProps {
  onMenuToggle: () => void;
  isLoggedIn: boolean;
  address?: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onMenuToggle,
  isLoggedIn,
  address,
  onConnect,
  onDisconnect,
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Bars3Icon className="h-6 w-6 text-gray-600" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="gradient-bg p-2 rounded-lg">
              <FireIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Fireworks</h1>
              <p className="text-xs text-gray-500 hidden sm:block">DeFi Yield Optimizer</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
              <BellIcon className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary-500 rounded-full"></span>
            </button>
          )}
          
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">Connected</p>
                <p className="text-xs text-gray-500">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
                </p>
              </div>
              <button
                onClick={onDisconnect}
                className="btn-secondary text-sm"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={onConnect}
              className="btn-primary"
            >
              Connect INTMAX
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
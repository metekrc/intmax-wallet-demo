import React from 'react';
import { EyeIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

interface Token {
  symbol: string;
  amount: number;
  price: number;
  value: number;
  change24h: number;
  tokenIndex: number;
  contractAddress?: string;
  decimals: number;
}

interface TokenListProps {
  tokens: Token[];
  onTokenInfo: (token: Token) => void;
}

export const TokenList: React.FC<TokenListProps> = ({ tokens, onTokenInfo }) => {
  if (tokens.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <EyeIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No tokens found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Connect your wallet and deposit tokens to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Token Balances</h2>
        <span className="text-sm text-gray-500">{tokens.length} tokens</span>
      </div>
      
      <div className="space-y-4">
        {tokens.map((token, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {token.symbol?.charAt(0) || 'T'}
                </span>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">
                  {token.symbol || `Token #${token.tokenIndex}`}
                </h3>
                <p className="text-sm text-gray-500">
                  {token.amount.toLocaleString()} tokens
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                ${token.value.toLocaleString()}
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-500">
                  ${token.price.toFixed(4)}
                </p>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  token.change24h >= 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                </span>
                <button
                  onClick={() => onTokenInfo(token)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <InformationCircleIcon className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
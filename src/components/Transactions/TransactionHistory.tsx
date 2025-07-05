import React from 'react';
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  ArrowsRightLeftIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw' | 'transfer' | 'yield';
  amount: number;
  token: string;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
  hash?: string;
  from?: string;
  to?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownIcon className="h-5 w-5 text-green-600" />;
      case 'withdraw':
        return <ArrowUpIcon className="h-5 w-5 text-red-600" />;
      case 'transfer':
        return <ArrowsRightLeftIcon className="h-5 w-5 text-blue-600" />;
      case 'yield':
        return <ClockIcon className="h-5 w-5 text-purple-600" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>;
      case 'failed':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Failed</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>;
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your transaction history will appear here once you start using the platform.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        <span className="text-sm text-gray-500">{transactions.length} transactions</span>
      </div>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {getTransactionIcon(transaction.type)}
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 capitalize">
                  {transaction.type}
                </h3>
                <p className="text-sm text-gray-500">
                  {transaction.timestamp.toLocaleDateString()} at {transaction.timestamp.toLocaleTimeString()}
                </p>
                {transaction.hash && (
                  <p className="text-xs text-gray-400 font-mono">
                    {transaction.hash.slice(0, 10)}...{transaction.hash.slice(-8)}
                  </p>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {transaction.amount.toLocaleString()} {transaction.token}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                {getStatusBadge(transaction.status)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
import React from 'react';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface ActionButtonsProps {
  onDeposit: () => void;
  onWithdraw: () => void;
  onTransfer: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onDeposit,
  onWithdraw,
  onTransfer,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button
        onClick={onDeposit}
        className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
      >
        <PlusIcon className="h-5 w-5" />
        <span>Deposit</span>
      </button>
      
      <button
        onClick={onWithdraw}
        className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
      >
        <MinusIcon className="h-5 w-5" />
        <span>Withdraw</span>
      </button>
      
      <button
        onClick={onTransfer}
        className="flex items-center justify-center space-x-2 btn-primary"
      >
        <span>Transfer</span>
      </button>
    </div>
  );
};
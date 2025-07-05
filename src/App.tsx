import React, { useEffect, useState } from 'react';
import { useIntMaxClient } from './hooks/useIntMaxClient';
import type { Token } from 'intmax2-client-sdk';
import { TokenType } from 'intmax2-client-sdk';

// Layout Components
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';

// Dashboard Components
import { HeroSection } from './components/Dashboard/HeroSection';
import { StatsCards } from './components/Dashboard/StatsCards';

// Portfolio Components
import { TokenList } from './components/Portfolio/TokenList';
import { ActionButtons } from './components/Portfolio/ActionButtons';

// Modal Components
import { DepositModal } from './components/Modals/DepositModal';
import { WithdrawModal } from './components/Modals/WithdrawModal';
import { TransferModal } from './components/Modals/TransferModal';

// Transaction Components
import { TransactionHistory } from './components/Transactions/TransactionHistory';

function App() {
  const {
    client,
    isLoggedIn,
    loading,
    error,
    initializeClient,
    login,
    logout,
  } = useIntMaxClient();

  // UI State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [transferModalOpen, setTransferModalOpen] = useState(false);

  // Data State
  const [balances, setBalances] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionResult, setActionResult] = useState<string | null>(null);

  // Mock data for demo purposes
  const mockTransactions = [
    {
      id: '1',
      type: 'deposit' as const,
      amount: 1000,
      token: 'USDC',
      timestamp: new Date(Date.now() - 86400000),
      status: 'completed' as const,
      hash: '0x1234567890abcdef1234567890abcdef12345678',
    },
    {
      id: '2',
      type: 'yield' as const,
      amount: 12.5,
      token: 'USDC',
      timestamp: new Date(Date.now() - 43200000),
      status: 'completed' as const,
    },
    {
      id: '3',
      type: 'transfer' as const,
      amount: 250,
      token: 'INTMAX',
      timestamp: new Date(Date.now() - 21600000),
      status: 'pending' as const,
      hash: '0xabcdef1234567890abcdef1234567890abcdef12',
    },
  ];

  // Initialize client on mount
  useEffect(() => {
    initializeClient();
  }, [initializeClient]);

  // Fetch balances when logged in
  useEffect(() => {
    const fetchBalances = async () => {
      if (client && isLoggedIn) {
        try {
          const result = await client.fetchTokenBalances();
          setBalances(result.balances || []);
        } catch (err) {
          console.error('Error fetching balances:', err);
        }
      }
    };

    fetchBalances();
  }, [client, isLoggedIn]);

  // Transform balances for display
  const transformedTokens = balances.map((balance) => ({
    symbol: balance.token.symbol || `Token #${balance.token.tokenIndex}`,
    amount: balance.amount,
    price: balance.token.price || 0,
    value: balance.amount * (balance.token.price || 0),
    change24h: Math.random() * 20 - 10, // Mock 24h change
    tokenIndex: balance.token.tokenIndex,
    contractAddress: balance.token.contractAddress,
    decimals: balance.token.decimals,
  }));

  // Calculate portfolio stats
  const totalValue = transformedTokens.reduce((sum, token) => sum + token.value, 0);
  const totalGrowth = totalValue * 0.08; // Mock 8% growth
  const totalDeposited = totalValue - totalGrowth;
  const totalEarned = totalGrowth;
  const avgAPR = 11.2;
  const activeStrategies = 3;

  // Handle actions
  const handleDeposit = async (tokenAddress: string, amount: string) => {
    if (!client) return;

    setActionLoading(true);
    try {
      const amountForSdk = parseFloat(amount);
      const matchedToken = balances.find(
        (b) => b.token.contractAddress?.toLowerCase() === tokenAddress.toLowerCase()
      )?.token;

      if (!matchedToken) {
        throw new Error('Token not found in balances');
      }

      await client.deposit({
        token: matchedToken,
        amount: amountForSdk,
        address: client.address,
      });

      setActionResult('✅ Deposit successful! Your funds are being allocated to the best pools.');
      setDepositModalOpen(false);
    } catch (err: any) {
      setActionResult(`❌ Deposit failed: ${err.message || err}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleWithdraw = async (tokenAddress: string, amount: string, ethAddress: string) => {
    if (!client) return;

    setActionLoading(true);
    try {
      const amountForSdk = parseFloat(amount);
      const matchedToken = balances.find(
        (b) => b.token.contractAddress?.toLowerCase() === tokenAddress.toLowerCase()
      )?.token;

      if (!matchedToken) {
        throw new Error('Token not found in balances');
      }

      await client.withdraw({
        token: matchedToken,
        amount: amountForSdk,
        address: ethAddress as `0x${string}`,
      });

      setActionResult('✅ Withdrawal successful! Check your L1 wallet.');
      setWithdrawModalOpen(false);
    } catch (err: any) {
      setActionResult(`❌ Withdrawal failed: ${err.message || err}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleTransfer = async (receiver: string, amount: string) => {
    if (!client) return;

    setActionLoading(true);
    try {
      const baseToken = balances.find((b) => b.token.tokenIndex === 0)?.token;
      if (!baseToken) {
        throw new Error('Native token not found');
      }

      const nativeToken: Token = {
        tokenIndex: baseToken.tokenIndex,
        symbol: baseToken.symbol || 'INTMAX',
        decimals: baseToken.decimals || 18,
        contractAddress: baseToken.contractAddress || '0x0000000000000000000000000000000000000000',
        tokenType: TokenType.NATIVE,
        price: 0,
      };

      await client.broadcastTransaction(
        [
          {
            address: receiver,
            amount: Number(amount),
            token: nativeToken,
          },
        ],
        false
      );

      setActionResult('✅ Transfer successful!');
      setTransferModalOpen(false);
    } catch (err: any) {
      setActionResult(`❌ Transfer failed: ${err.message || err}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleTokenInfo = (token: any) => {
    alert(`Token Info:\n- Symbol: ${token.symbol}\n- Amount: ${token.amount}\n- Value: $${token.value.toFixed(2)}\n- Contract: ${token.contractAddress || 'N/A'}`);
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <div className="space-y-8">
          <HeroSection
            totalValue={0}
            totalGrowth={0}
            isLoggedIn={false}
          />
          <div className="card text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Welcome to Fireworks</h3>
            <p className="text-gray-500 mb-6">
              Connect your INTMAX wallet to start optimizing your DeFi yields
            </p>
            <button onClick={login} className="btn-primary">
              Connect INTMAX Wallet
            </button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <HeroSection
              totalValue={totalValue}
              totalGrowth={totalGrowth}
              isLoggedIn={isLoggedIn}
            />
            <StatsCards
              totalDeposited={totalDeposited}
              totalEarned={totalEarned}
              avgAPR={avgAPR}
              activeStrategies={activeStrategies}
            />
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <ActionButtons
              onDeposit={() => setDepositModalOpen(true)}
              onWithdraw={() => setWithdrawModalOpen(true)}
              onTransfer={() => setTransferModalOpen(true)}
            />
            <TokenList tokens={transformedTokens} onTokenInfo={handleTokenInfo} />
          </div>
        );

      case 'transactions':
        return <TransactionHistory transactions={mockTransactions} />;

      case 'analytics':
        return (
          <div className="card text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-500">
              Advanced analytics and performance metrics coming soon...
            </p>
          </div>
        );

      default:
        return (
          <div className="card text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-500">This feature is under development.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        <Sidebar
          isOpen={sidebarOpen}
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setSidebarOpen(false);
          }}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
            isLoggedIn={isLoggedIn}
            address={client?.address}
            onConnect={login}
            onDisconnect={logout}
          />

          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 py-8 lg:px-6">
              {loading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500">Loading...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">Error: {error}</p>
                </div>
              )}

              {actionResult && (
                <div className={`border rounded-lg p-4 mb-6 ${
                  actionResult.includes('successful') 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <p>{actionResult}</p>
                  <button
                    onClick={() => setActionResult(null)}
                    className="mt-2 text-sm underline"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {renderContent()}
            </div>
          </main>
        </div>
      </div>

      {/* Modals */}
      <DepositModal
        isOpen={depositModalOpen}
        onClose={() => setDepositModalOpen(false)}
        onDeposit={handleDeposit}
        loading={actionLoading}
      />

      <WithdrawModal
        isOpen={withdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
        onWithdraw={handleWithdraw}
        loading={actionLoading}
      />

      <TransferModal
        isOpen={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
        onTransfer={handleTransfer}
        loading={actionLoading}
      />
    </div>
  );
}

export default App;
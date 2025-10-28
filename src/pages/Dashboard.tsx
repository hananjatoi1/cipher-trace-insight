import { Globe, Wallet, Hash, User, Activity, ShieldAlert, Flag } from 'lucide-react';
import { QuickSearchCard } from '@/components/QuickSearchCard';
import { KPICard } from '@/components/KPICard';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleSearch = (type: string) => (value: string) => {
    console.log(`Searching ${type}:`, value);
    
    if (type === 'domain') {
      window.open(`https://ens.domains/`, '_blank');
    } else if (type === 'transaction') {
      window.open(`https://etherscan.io/tx/${value}`, '_blank');
    } else if (type === 'wallet') {
      window.open(`https://etherscan.io/address/${value}`, '_blank');
    } else if (type === 'kyc') {
      navigate('/kyc');
    }
  };

  return (
    <div className="min-h-screen p-8 space-y-8">
      {/* Quick Access Row */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <QuickSearchCard
            title="Domain Search"
            icon={Globe}
            placeholder="Enter ENS or domain..."
            onSearch={handleSearch('domain')}
          />
          <QuickSearchCard
            title="Address Search"
            icon={Wallet}
            placeholder="0x..."
            onSearch={handleSearch('wallet')}
          />
          <QuickSearchCard
            title="Transaction Search"
            icon={Hash}
            placeholder="TxID..."
            onSearch={handleSearch('transaction')}
          />
          <QuickSearchCard
            title="KYC Lookup"
            icon={User}
            placeholder="Name / ID / Phone..."
            onSearch={handleSearch('kyc')}
            restricted
          />
        </div>
      </div>

      {/* KPI Row */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard
            title="Total Transactions"
            value="1,247,893"
            icon={Activity}
            trend={{ value: 12.5, positive: true }}
          />
          <KPICard
            title="Risk Alerts"
            value="47"
            icon={ShieldAlert}
            trend={{ value: 8.2, positive: false }}
            highlight
          />
          <KPICard
            title="Flagged Addresses"
            value="1,834"
            icon={Flag}
            trend={{ value: 3.1, positive: false }}
          />
        </div>
      </div>

      {/* Charts Panel */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Activity Overview</h2>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="xl:col-span-2 glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Transaction Volume</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {Array.from({ length: 30 }, (_, i) => {
                const height = Math.random() * 100;
                return (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-primary/50 to-primary/20 rounded-t hover:from-primary/70 hover:to-primary/30 transition-all cursor-pointer"
                    style={{ height: `${height}%` }}
                  />
                );
              })}
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Risk Distribution</h3>
            <div className="flex items-center justify-center h-64">
              <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="hsl(var(--primary))"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray="150 352"
                    className="opacity-80"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="hsl(var(--secondary))"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray="100 402"
                    strokeDashoffset="-150"
                    className="opacity-80"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="hsl(var(--destructive))"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray="102 400"
                    strokeDashoffset="-250"
                    className="opacity-80"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground">1,834</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">Low Risk</span>
                </div>
                <span className="text-sm font-semibold text-foreground">890</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span className="text-sm text-muted-foreground">Medium Risk</span>
                </div>
                <span className="text-sm font-semibold text-foreground">627</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-sm text-muted-foreground">High Risk</span>
                </div>
                <span className="text-sm font-semibold text-foreground">317</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-foreground">Recent Traced Transactions</h2>
        <div className="glass-card rounded-xl p-6">
          <div className="space-y-3">
            {[
              {
                from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
                to: '0x8Ba1f109551bD432803012645Ac136ddd64DBA72',
                value: '12.5 ETH',
                risk: 'high',
                time: '2 min ago',
              },
              {
                from: '0x1234567890123456789012345678901234567890',
                to: '0x0987654321098765432109876543210987654321',
                value: '0.5 BTC',
                risk: 'low',
                time: '15 min ago',
              },
              {
                from: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
                to: '0xfedcbafedcbafedcbafedcbafedcbafedcbafed',
                value: '250 USDT',
                risk: 'medium',
                time: '1 hour ago',
              },
            ].map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 rounded-lg bg-background/30 hover:bg-background/50 transition-colors cursor-pointer border border-border/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-muted-foreground">From:</span>
                    <code className="text-sm font-mono text-foreground">{tx.from}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">To:</span>
                    <code className="text-sm font-mono text-foreground">{tx.to}</code>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-foreground">{tx.value}</span>
                  <span
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      tx.risk === 'high'
                        ? 'bg-destructive/10 text-destructive border border-destructive/20'
                        : tx.risk === 'medium'
                        ? 'bg-secondary/10 text-secondary border border-secondary/20'
                        : 'bg-primary/10 text-primary border border-primary/20'
                    }`}
                  >
                    {tx.risk.toUpperCase()}
                  </span>
                  <span className="text-sm text-muted-foreground w-20">{tx.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

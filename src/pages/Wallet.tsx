import { Wallet as WalletIcon, Activity, Clock, DollarSign } from 'lucide-react';
import { KPICard } from '@/components/KPICard';

export default function Wallet() {
  const mockAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Wallet Tracker</h1>
        <p className="text-muted-foreground">Monitor and analyze wallet activity</p>
      </div>

      {/* Address Header */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 rounded-lg bg-primary/10">
            <WalletIcon className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
            <code className="text-lg font-mono text-foreground">{mockAddress}</code>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Balance</p>
            <p className="text-2xl font-bold text-foreground">147.82 ETH</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 rounded bg-primary/10 text-primary border border-primary/20 text-sm">
            Ethereum
          </span>
          <span className="px-3 py-1 rounded bg-secondary/10 text-secondary border border-secondary/20 text-sm">
            Active
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Balance (USD)"
          value="$342,157"
          icon={DollarSign}
        />
        <KPICard
          title="Total Transactions"
          value="1,247"
          icon={Activity}
          trend={{ value: 8.3, positive: true }}
        />
        <KPICard
          title="First Seen"
          value="245 days"
          icon={Clock}
        />
        <KPICard
          title="Last Activity"
          value="2 hours"
          icon={Clock}
        />
      </div>

      {/* Activity Chart */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Activity Timeline</h3>
        <div className="h-48 flex items-end justify-between gap-1">
          {Array.from({ length: 60 }, (_, i) => {
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

      {/* Transactions Table */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Transactions</h3>
        <div className="space-y-3">
          {[
            {
              type: 'out',
              to: '0x8Ba1f109551bD432803012645Ac136ddd64DBA72',
              value: '12.5 ETH',
              time: '2 hours ago',
            },
            {
              type: 'in',
              to: '0x1234567890123456789012345678901234567890',
              value: '5.2 ETH',
              time: '8 hours ago',
            },
            {
              type: 'out',
              to: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
              value: '3.8 ETH',
              time: '1 day ago',
            },
          ].map((tx, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 rounded-lg bg-background/30 hover:bg-background/50 transition-colors cursor-pointer border border-border/50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`px-3 py-1 rounded text-xs font-semibold ${
                    tx.type === 'out'
                      ? 'bg-secondary/10 text-secondary border border-secondary/20'
                      : 'bg-primary/10 text-primary border border-primary/20'
                  }`}
                >
                  {tx.type === 'out' ? 'OUT' : 'IN'}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    {tx.type === 'out' ? 'To:' : 'From:'}
                  </p>
                  <code className="text-sm font-mono text-foreground">{tx.to}</code>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-foreground">{tx.value}</p>
                <p className="text-xs text-muted-foreground">{tx.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

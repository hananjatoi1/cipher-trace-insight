import { useState } from 'react';
import { Search, ExternalLink, Download, TrendingDown, TrendingUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const mockTransactions = [
  {
    id: '0x1a2b3c4d5e6f...',
    from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    to: '0x8Ba1f109551bD432803012645Ac136ddd64DBA72',
    value: '12.5 ETH',
    chain: 'Ethereum',
    risk: 85,
    date: '2025-10-25 14:32',
    tags: ['Mixer', 'High Volume'],
  },
  {
    id: '0x9f8e7d6c5b4a...',
    from: '0x1234567890123456789012345678901234567890',
    to: '0x0987654321098765432109876543210987654321',
    value: '0.5 BTC',
    chain: 'Bitcoin',
    risk: 22,
    date: '2025-10-25 13:15',
    tags: ['Exchange'],
  },
  {
    id: '0xabcdef123456...',
    from: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd',
    to: '0xfedcbafedcbafedcbafedcbafedcbafedcbafed',
    value: '250 USDT',
    chain: 'Tron',
    risk: 54,
    date: '2025-10-25 12:45',
    tags: ['Tether', 'Medium Risk'],
  },
];

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTx, setSelectedTx] = useState<typeof mockTransactions[0] | null>(null);

  const getRiskColor = (risk: number) => {
    if (risk >= 67) return 'text-destructive';
    if (risk >= 34) return 'text-secondary';
    return 'text-primary';
  };

  const getRiskBg = (risk: number) => {
    if (risk >= 67) return 'bg-destructive/10 border-destructive/20';
    if (risk >= 34) return 'bg-secondary/10 border-secondary/20';
    return 'bg-primary/10 border-primary/20';
  };

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">Transaction Search</h1>
        <p className="text-muted-foreground">Search and analyze blockchain transactions</p>
      </div>

      {/* Search Bar */}
      <div className="glass-card rounded-xl p-6 mb-6">
        <div className="flex gap-4">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter transaction ID, address, or domain..."
            className="flex-1 bg-background/50 border-border/50 focus:border-primary/50 font-mono"
          />
          <Button className="bg-primary hover:bg-primary-glow text-primary-foreground px-8">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Transactions List */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Results ({mockTransactions.length})</h2>
            <Button variant="outline" size="sm" className="border-primary/20 text-primary">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>

          {mockTransactions.map((tx) => (
            <div
              key={tx.id}
              onClick={() => setSelectedTx(tx)}
              className={`glass-card rounded-xl p-6 cursor-pointer transition-all duration-300 hover:border-primary/30 ${
                selectedTx?.id === tx.id ? 'border-primary/50 glow-primary' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-sm font-mono text-foreground">{tx.id}</code>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-2xl font-bold ${getRiskColor(tx.risk)}`}>{tx.risk}</span>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Risk Score</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">From:</span>
                  <code className="text-sm font-mono text-foreground">{tx.from}</code>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-secondary" />
                  <span className="text-xs text-muted-foreground">To:</span>
                  <code className="text-sm font-mono text-foreground">{tx.to}</code>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{tx.value}</span>
                  <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{tx.chain}</span>
                </div>
                <div className="flex gap-2">
                  {tx.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2 py-1 rounded border ${getRiskBg(tx.risk)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="xl:col-span-1">
          {selectedTx ? (
            <div className="glass-card rounded-xl p-6 sticky top-8">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Transaction Details</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Transaction ID</p>
                  <code className="text-sm font-mono text-foreground break-all">{selectedTx.id}</code>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Value</p>
                  <p className="text-xl font-bold text-foreground">{selectedTx.value}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Chain</p>
                  <p className="text-sm text-foreground">{selectedTx.chain}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">Risk Breakdown</p>
                  <div className="space-y-2 mt-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Mixer Usage</span>
                        <span className="text-foreground">35%</span>
                      </div>
                      <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                        <div className="h-full bg-destructive" style={{ width: '35%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Transaction Velocity</span>
                        <span className="text-foreground">28%</span>
                      </div>
                      <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary" style={{ width: '28%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Known Entities</span>
                        <span className="text-foreground">22%</span>
                      </div>
                      <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '22%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Explorer
                  </Button>
                  <Button className="w-full bg-secondary/10 hover:bg-secondary/20 text-secondary border border-secondary/20">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF Report
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-xl p-6 sticky top-8 text-center">
              <p className="text-muted-foreground">Select a transaction to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

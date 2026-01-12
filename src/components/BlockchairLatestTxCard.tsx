import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { List, Search, ArrowDownLeft, ArrowUpRight, Loader2 } from 'lucide-react';
import { useBlockchair, LatestTransaction } from '@/hooks/useBlockchair';
import { format } from 'date-fns';

const CHAINS = [
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'litecoin', label: 'Litecoin' },
  { value: 'dogecoin', label: 'Dogecoin' },
];

export function BlockchairLatestTxCard() {
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('bitcoin');
  const [transactions, setTransactions] = useState<LatestTransaction[]>([]);
  const { loading, error, fetchLatestTransactions } = useBlockchair();

  const handleSearch = async () => {
    if (!address.trim()) return;
    const result = await fetchLatestTransactions(address.trim(), chain);
    setTransactions(result);
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM dd, HH:mm');
    } catch {
      return dateStr;
    }
  };

  const truncateHash = (hash: string) => {
    if (!hash) return '';
    return `${hash.slice(0, 12)}...${hash.slice(-10)}`;
  };

  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <List className="h-5 w-5 text-accent" />
          Latest Transactions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select value={chain} onValueChange={setChain}>
            <SelectTrigger className="w-32 bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CHAINS.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Enter wallet address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="flex-1 bg-background/50"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} disabled={loading} className="gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            Search
          </Button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        {transactions.length > 0 && (
          <div className="space-y-2 pt-2 max-h-64 overflow-y-auto">
            {transactions.map((tx, i) => (
              <div
                key={tx.hash || i}
                className="flex items-center justify-between p-3 rounded-lg bg-background/30 border border-border/50 hover:bg-background/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {tx.balanceChange >= 0 ? (
                    <ArrowDownLeft className="h-4 w-4 text-primary" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-destructive" />
                  )}
                  <div>
                    <code className="text-sm font-mono text-foreground">{truncateHash(tx.hash)}</code>
                    <p className="text-xs text-muted-foreground">{formatDate(tx.time)}</p>
                  </div>
                </div>
                <span className={`font-semibold ${tx.balanceChange >= 0 ? 'text-primary' : 'text-destructive'}`}>
                  {tx.balanceChange >= 0 ? '+' : ''}{tx.balanceChange.toFixed(8)}
                </span>
              </div>
            ))}
          </div>
        )}

        {transactions.length === 0 && !loading && !error && (
          <div className="text-center py-6 text-muted-foreground text-sm">
            Enter an address to view latest transactions
          </div>
        )}
      </CardContent>
    </Card>
  );
}

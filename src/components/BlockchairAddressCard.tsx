import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet, Search, Clock, Activity, DollarSign, Loader2 } from 'lucide-react';
import { useBlockchair, AddressData } from '@/hooks/useBlockchair';
import { format } from 'date-fns';
import { validateAddress, validateChain, type Chain } from '@/lib/validation/blockchair';

const CHAINS = [
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'litecoin', label: 'Litecoin' },
  { value: 'dogecoin', label: 'Dogecoin' },
];

export function BlockchairAddressCard() {
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState<Chain>('bitcoin');
  const [data, setData] = useState<AddressData | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { loading, error, fetchAddressSummary } = useBlockchair();

  const handleSearch = async () => {
    setValidationError(null);
    
    // Validate chain
    const chainValidation = validateChain(chain);
    if (!chainValidation.success) {
      setValidationError(chainValidation.error || 'Invalid chain');
      return;
    }
    
    // Validate address
    const addressValidation = validateAddress(address, chain);
    if (!addressValidation.success) {
      setValidationError(addressValidation.error || 'Invalid address');
      return;
    }
    
    const result = await fetchAddressSummary(address.trim(), chain);
    setData(result);
  };

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'N/A';
    try {
      return format(new Date(dateStr), 'MMM dd, yyyy HH:mm');
    } catch {
      return dateStr;
    }
  };

  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Wallet className="h-5 w-5 text-primary" />
          Address Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Select value={chain} onValueChange={(value) => setChain(value as Chain)}>
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

        {(error || validationError) && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {validationError || error}
          </div>
        )}

        {data && (
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-background/30 border border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <DollarSign className="h-3 w-3" />
                Balance
              </div>
              <p className="font-semibold text-foreground">
                {data.balance.toFixed(8)} {chain.toUpperCase().slice(0, 3)}
              </p>
              <p className="text-xs text-muted-foreground">${data.balanceUsd.toFixed(2)}</p>
            </div>
            <div className="p-3 rounded-lg bg-background/30 border border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Activity className="h-3 w-3" />
                Transactions
              </div>
              <p className="font-semibold text-foreground">{data.txCount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-lg bg-background/30 border border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Clock className="h-3 w-3" />
                First Seen
              </div>
              <p className="font-semibold text-foreground text-sm">{formatDate(data.firstSeen)}</p>
            </div>
            <div className="p-3 rounded-lg bg-background/30 border border-border/50">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <Clock className="h-3 w-3" />
                Last Seen
              </div>
              <p className="font-semibold text-foreground text-sm">{formatDate(data.lastSeen)}</p>
            </div>
          </div>
        )}

        {!data && !loading && !error && (
          <div className="text-center py-6 text-muted-foreground text-sm">
            Enter a wallet address to view summary
          </div>
        )}
      </CardContent>
    </Card>
  );
}

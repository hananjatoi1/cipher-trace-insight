import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hash, Search, ArrowDownLeft, ArrowUpRight, Clock, Check, Loader2 } from 'lucide-react';
import { useBlockchair, TransactionData } from '@/hooks/useBlockchair';
import { format } from 'date-fns';
import { validateTransactionHash, validateChain, type Chain } from '@/lib/validation/blockchair';

const CHAINS = [
  { value: 'bitcoin', label: 'Bitcoin' },
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'litecoin', label: 'Litecoin' },
  { value: 'dogecoin', label: 'Dogecoin' },
];

export function BlockchairTransactionCard() {
  const [txHash, setTxHash] = useState('');
  const [chain, setChain] = useState<Chain>('bitcoin');
  const [data, setData] = useState<TransactionData | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { loading, error, fetchTransactionDetails } = useBlockchair();

  const handleSearch = async () => {
    setValidationError(null);
    
    // Validate chain
    const chainValidation = validateChain(chain);
    if (!chainValidation.success) {
      setValidationError(chainValidation.error || 'Invalid chain');
      return;
    }
    
    // Validate transaction hash
    const hashValidation = validateTransactionHash(txHash);
    if (!hashValidation.success) {
      setValidationError(hashValidation.error || 'Invalid transaction hash');
      return;
    }
    
    const result = await fetchTransactionDetails(txHash.trim(), chain);
    setData(result);
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), 'MMM dd, yyyy HH:mm:ss');
    } catch {
      return dateStr;
    }
  };

  const truncateAddress = (addr: string) => {
    if (!addr) return 'Unknown';
    return `${addr.slice(0, 10)}...${addr.slice(-8)}`;
  };

  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Hash className="h-5 w-5 text-secondary" />
          Transaction Details
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
            placeholder="Enter transaction hash..."
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
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
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-background/30 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Clock className="h-3 w-3" />
                  Time
                </div>
                <p className="font-semibold text-foreground text-sm">{formatDate(data.time)}</p>
              </div>
              <div className="p-3 rounded-lg bg-background/30 border border-border/50">
                <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                  <Check className="h-3 w-3" />
                  Confirmations
                </div>
                <p className="font-semibold text-foreground">
                  {data.confirmations > 0 ? data.confirmations.toLocaleString() : 'Pending'}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-background/30 border border-border/50">
                <div className="text-muted-foreground text-xs mb-1">Fee</div>
                <p className="font-semibold text-foreground">{data.fee.toFixed(8)}</p>
                <p className="text-xs text-muted-foreground">${data.feeUsd.toFixed(2)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-foreground">
                  <ArrowDownLeft className="h-4 w-4 text-primary" />
                  Inputs ({data.inputCount})
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {data.inputs.slice(0, 5).map((input, i) => (
                    <div key={i} className="flex justify-between text-xs p-2 rounded bg-background/20">
                      <code className="text-muted-foreground">{truncateAddress(input.recipient)}</code>
                      <span className="text-primary">{input.value.toFixed(6)}</span>
                    </div>
                  ))}
                  {data.inputs.length > 5 && (
                    <p className="text-xs text-muted-foreground text-center">+{data.inputs.length - 5} more</p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-foreground">
                  <ArrowUpRight className="h-4 w-4 text-secondary" />
                  Outputs ({data.outputCount})
                </div>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {data.outputs.slice(0, 5).map((output, i) => (
                    <div key={i} className="flex justify-between text-xs p-2 rounded bg-background/20">
                      <code className="text-muted-foreground">{truncateAddress(output.recipient)}</code>
                      <span className="text-secondary">{output.value.toFixed(6)}</span>
                    </div>
                  ))}
                  {data.outputs.length > 5 && (
                    <p className="text-xs text-muted-foreground text-center">+{data.outputs.length - 5} more</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {!data && !loading && !error && (
          <div className="text-center py-6 text-muted-foreground text-sm">
            Enter a transaction hash to view details
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface AddressData {
  address: string;
  balance: number;
  balanceUsd: number;
  txCount: number;
  firstSeen: string | null;
  lastSeen: string | null;
  chain: string;
}

export interface TransactionData {
  hash: string;
  blockId: number;
  time: string;
  size: number;
  fee: number;
  feeUsd: number;
  inputCount: number;
  outputCount: number;
  inputTotal: number;
  outputTotal: number;
  confirmations: number;
  inputs: Array<{ recipient: string; value: number }>;
  outputs: Array<{ recipient: string; value: number }>;
}

export interface LatestTransaction {
  hash: string;
  time: string;
  balanceChange: number;
}

export function useBlockchair() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddressSummary = async (address: string, chain = 'bitcoin'): Promise<AddressData | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke('blockchair', {
        body: { action: 'address', address, chain }
      });

      if (fnError) throw fnError;
      
      if (data.context?.error) {
        throw new Error(data.context.error);
      }

      const addressData = data.data?.[address];
      if (!addressData) {
        throw new Error('Address not found');
      }

      const info = addressData.address;
      return {
        address,
        balance: info.balance / 100000000, // Convert satoshis to BTC
        balanceUsd: info.balance_usd || 0,
        txCount: info.transaction_count || 0,
        firstSeen: info.first_seen_receiving || null,
        lastSeen: info.last_seen_receiving || null,
        chain,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch address';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionDetails = async (txHash: string, chain = 'bitcoin'): Promise<TransactionData | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke('blockchair', {
        body: { action: 'transaction', txHash, chain }
      });

      if (fnError) throw fnError;
      
      if (data.context?.error) {
        throw new Error(data.context.error);
      }

      const txData = data.data?.[txHash];
      if (!txData) {
        throw new Error('Transaction not found');
      }

      const tx = txData.transaction;
      return {
        hash: txHash,
        blockId: tx.block_id,
        time: tx.time,
        size: tx.size,
        fee: tx.fee / 100000000,
        feeUsd: tx.fee_usd || 0,
        inputCount: tx.input_count,
        outputCount: tx.output_count,
        inputTotal: tx.input_total / 100000000,
        outputTotal: tx.output_total / 100000000,
        confirmations: data.context?.state - tx.block_id || 0,
        inputs: txData.inputs?.map((i: any) => ({
          recipient: i.recipient,
          value: i.value / 100000000,
        })) || [],
        outputs: txData.outputs?.map((o: any) => ({
          recipient: o.recipient,
          value: o.value / 100000000,
        })) || [],
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch transaction';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestTransactions = async (address: string, chain = 'bitcoin'): Promise<LatestTransaction[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke('blockchair', {
        body: { action: 'latest', address, chain }
      });

      if (fnError) throw fnError;
      
      if (data.context?.error) {
        throw new Error(data.context.error);
      }

      const addressData = data.data?.[address];
      if (!addressData) {
        throw new Error('Address not found');
      }

      return (addressData.transactions || []).map((tx: any) => ({
        hash: tx.hash,
        time: tx.time,
        balanceChange: tx.balance_change / 100000000,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch transactions';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchBlockchainStats = async (chain = 'bitcoin') => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke('blockchair', {
        body: { action: 'stats', chain }
      });

      if (fnError) throw fnError;
      
      return data.data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch stats';
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchAddressSummary,
    fetchTransactionDetails,
    fetchLatestTransactions,
    fetchBlockchainStats,
  };
}

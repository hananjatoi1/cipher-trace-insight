import { z } from 'zod';

// Supported blockchain chains
export const ChainSchema = z.enum(['bitcoin', 'ethereum', 'litecoin', 'dogecoin']);
export type Chain = z.infer<typeof ChainSchema>;

// Bitcoin address validation (supports legacy, SegWit, and Bech32)
const BitcoinAddressSchema = z.string()
  .min(26, 'Bitcoin address must be at least 26 characters')
  .max(62, 'Bitcoin address must be at most 62 characters')
  .regex(
    /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/i,
    'Invalid Bitcoin address format'
  );

// Ethereum address validation (0x followed by 40 hex characters)
const EthereumAddressSchema = z.string()
  .regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address format');

// Litecoin address validation (supports L, M, and ltc1 prefixes)
const LitecoinAddressSchema = z.string()
  .min(26, 'Litecoin address must be at least 26 characters')
  .max(62, 'Litecoin address must be at most 62 characters')
  .regex(
    /^[LM][a-km-zA-HJ-NP-Z1-9]{25,34}$|^ltc1[a-z0-9]{39,59}$/i,
    'Invalid Litecoin address format'
  );

// Dogecoin address validation (D prefix)
const DogecoinAddressSchema = z.string()
  .min(26, 'Dogecoin address must be at least 26 characters')
  .max(34, 'Dogecoin address must be at most 34 characters')
  .regex(/^D[5-9A-HJ-NP-U][a-km-zA-HJ-NP-Z1-9]{24,32}$/i, 'Invalid Dogecoin address format');

// Transaction hash validation (hex string, 64 characters for most chains)
const TransactionHashSchema = z.string()
  .min(32, 'Transaction hash must be at least 32 characters')
  .max(128, 'Transaction hash must be at most 128 characters')
  .regex(/^(0x)?[a-fA-F0-9]+$/, 'Invalid transaction hash format');

// Address validation based on chain
export function validateAddress(address: string, chain: Chain): { success: boolean; error?: string } {
  const trimmed = address.trim();
  
  if (!trimmed) {
    return { success: false, error: 'Address is required' };
  }

  let result;
  switch (chain) {
    case 'bitcoin':
      result = BitcoinAddressSchema.safeParse(trimmed);
      break;
    case 'ethereum':
      result = EthereumAddressSchema.safeParse(trimmed);
      break;
    case 'litecoin':
      result = LitecoinAddressSchema.safeParse(trimmed);
      break;
    case 'dogecoin':
      result = DogecoinAddressSchema.safeParse(trimmed);
      break;
    default:
      return { success: false, error: 'Invalid chain selected' };
  }

  if (!result.success) {
    const errorMessage = result.error.errors[0]?.message || 'Invalid address format';
    return { success: false, error: errorMessage };
  }

  return { success: true };
}

// Transaction hash validation
export function validateTransactionHash(txHash: string): { success: boolean; error?: string } {
  const trimmed = txHash.trim();
  
  if (!trimmed) {
    return { success: false, error: 'Transaction hash is required' };
  }

  const result = TransactionHashSchema.safeParse(trimmed);
  
  if (!result.success) {
    const errorMessage = result.error.errors[0]?.message || 'Invalid transaction hash format';
    return { success: false, error: errorMessage };
  }

  return { success: true };
}

// Chain validation
export function validateChain(chain: string): { success: boolean; error?: string } {
  const result = ChainSchema.safeParse(chain);
  
  if (!result.success) {
    return { success: false, error: 'Invalid chain selected' };
  }

  return { success: true };
}

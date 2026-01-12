import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const BLOCKCHAIR_API_KEY = Deno.env.get('BLOCKCHAIR_API_KEY');
    if (!BLOCKCHAIR_API_KEY) {
      throw new Error('BLOCKCHAIR_API_KEY is not configured');
    }

    const { action, address, txHash, chain = 'bitcoin' } = await req.json();

    // Validate required parameters
    if (!action) {
      throw new Error('Action is required');
    }

    let url: string;
    let baseUrl: string;
    
    // Normalize chain name for API
    const normalizedChain = chain.toLowerCase();
    
    switch (action) {
      case 'address':
        if (!address || !address.trim()) {
          throw new Error('Address is required for address lookup');
        }
        baseUrl = `https://api.blockchair.com/${normalizedChain}/dashboards/address/${encodeURIComponent(address.trim())}`;
        url = `${baseUrl}?key=${BLOCKCHAIR_API_KEY}`;
        break;
      case 'transaction':
        if (!txHash || !txHash.trim()) {
          throw new Error('Transaction hash is required for transaction lookup');
        }
        baseUrl = `https://api.blockchair.com/${normalizedChain}/dashboards/transaction/${encodeURIComponent(txHash.trim())}`;
        url = `${baseUrl}?key=${BLOCKCHAIR_API_KEY}`;
        break;
      case 'latest':
        if (!address || !address.trim()) {
          throw new Error('Address is required for latest transactions lookup');
        }
        baseUrl = `https://api.blockchair.com/${normalizedChain}/dashboards/address/${encodeURIComponent(address.trim())}`;
        url = `${baseUrl}?key=${BLOCKCHAIR_API_KEY}&limit=10&transaction_details=true`;
        break;
      case 'stats':
        baseUrl = `https://api.blockchair.com/${normalizedChain}/stats`;
        url = `${baseUrl}?key=${BLOCKCHAIR_API_KEY}`;
        break;
      default:
        throw new Error('Invalid action. Use: address, transaction, latest, or stats');
    }

    console.log(`Fetching from Blockchair: ${action} for chain ${normalizedChain}`);
    console.log(`Request URL (without key): ${baseUrl}`);
    
    const response = await fetch(url);
    const responseText = await response.text();
    
    if (!response.ok) {
      console.error('Blockchair API error:', response.status);
      // Check if it's a "not found" scenario vs actual API error
      if (response.status === 404) {
        throw new Error(`Resource not found. Please verify the ${action === 'transaction' ? 'transaction hash' : 'address'} is valid for ${normalizedChain}.`);
      }
      throw new Error(`Blockchair API error: ${response.status}`);
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error('Failed to parse response:', responseText.substring(0, 500));
      throw new Error('Invalid response from Blockchair API');
    }
    
    // Check if the data contains valid results
    if (data.context?.error) {
      throw new Error(data.context.error);
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

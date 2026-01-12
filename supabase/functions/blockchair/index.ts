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
    
    switch (action) {
      case 'address':
        if (!address || !address.trim()) {
          throw new Error('Address is required for address lookup');
        }
        url = `https://api.blockchair.com/${chain}/dashboards/address/${encodeURIComponent(address.trim())}?key=${BLOCKCHAIR_API_KEY}`;
        break;
      case 'transaction':
        if (!txHash || !txHash.trim()) {
          throw new Error('Transaction hash is required for transaction lookup');
        }
        url = `https://api.blockchair.com/${chain}/dashboards/transaction/${encodeURIComponent(txHash.trim())}?key=${BLOCKCHAIR_API_KEY}`;
        break;
      case 'latest':
        if (!address || !address.trim()) {
          throw new Error('Address is required for latest transactions lookup');
        }
        url = `https://api.blockchair.com/${chain}/dashboards/address/${encodeURIComponent(address.trim())}?key=${BLOCKCHAIR_API_KEY}&limit=10&transaction_details=true`;
        break;
      case 'stats':
        url = `https://api.blockchair.com/${chain}/stats?key=${BLOCKCHAIR_API_KEY}`;
        break;
      default:
        throw new Error('Invalid action. Use: address, transaction, latest, or stats');
    }

    console.log(`Fetching from Blockchair: ${action} for chain ${chain}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Blockchair API error:', response.status, errorText);
      throw new Error(`Blockchair API error: ${response.status}`);
    }

    const data = await response.json();

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

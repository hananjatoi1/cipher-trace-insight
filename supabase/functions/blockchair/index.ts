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

    let url: string;
    
    switch (action) {
      case 'address':
        // Get address summary
        url = `https://api.blockchair.com/${chain}/dashboards/address/${address}?key=${BLOCKCHAIR_API_KEY}`;
        break;
      case 'transaction':
        // Get transaction details
        url = `https://api.blockchair.com/${chain}/dashboards/transaction/${txHash}?key=${BLOCKCHAIR_API_KEY}`;
        break;
      case 'latest':
        // Get latest transactions for an address
        url = `https://api.blockchair.com/${chain}/dashboards/address/${address}?key=${BLOCKCHAIR_API_KEY}&limit=10&transaction_details=true`;
        break;
      case 'stats':
        // Get blockchain stats
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

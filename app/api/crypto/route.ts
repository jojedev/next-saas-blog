import { Database } from "@/lib/types/supabase";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const addresses = searchParams.get("addresses");
	if (!addresses) {
		return Response.json({ error: 'Addresses parameter is missing' });
	}

	try {
		// Get this data on component -->  await fetch(`/api/crypto?addresses=${encodeURIComponent(JSON.stringify(addresses))}`);
		const parsedAddresses = JSON.parse(addresses)
		const result = await Promise.all(Object.entries(parsedAddresses).map(async ([chain, address]: any) => {
			const response = await fetch(`https://api.3xpl.com/${chain}/address/${address}?data=address,balances,events&from=all&library=currencies,rates(usd)&limit=1000&token=3A0_t3st3xplor3rpub11cb3t4efcd21748a5e`);
			const data = await response.json();
			data.data.chain = chain;
			return data;
		  }));
		  return Response.json(result)
	} catch(error) {
		console.log(error)
		return Response.json({ error });
	}
	  
}
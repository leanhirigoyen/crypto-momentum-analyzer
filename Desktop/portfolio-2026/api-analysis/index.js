const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const COINS = [
  "bitcoin",
  "ethereum",
  "solana",
  "cardano",
  "polkadot",
  "avalanche-2",
  "chainlink",
  "polygon"
];


async function getMarketData() {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS.join(",")}&price_change_percentage=24h`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function analyzeMomentum() {
  const data = await getMarketData();

  const sorted = data.sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );

  console.log("📈 Top ganadoras 24h:");
  sorted.slice(0, 3).forEach((coin) => {
    console.log(
      `${coin.name}: ${coin.price_change_percentage_24h.toFixed(2)}%`
    );
  });

 const losers = sorted
  .filter(coin => coin.price_change_percentage_24h < 0)
  .slice(0, 3);

console.log("\n📉 Top perdedoras 24h:");
if (losers.length === 0) {
  console.log("No hay monedas en negativo en las últimas 24h.");
} else {
  losers.forEach((coin) => {
    console.log(
      `${coin.name}: ${coin.price_change_percentage_24h.toFixed(2)}%`
    );
  });
}

}

analyzeMomentum();

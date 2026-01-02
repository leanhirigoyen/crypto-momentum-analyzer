const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

const COINS = ["bitcoin", "ethereum", "solana"];

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

  console.log("\n📉 Top perdedoras 24h:");
  sorted
    .slice(-3)
    .reverse()
    .forEach((coin) => {
      console.log(
        `${coin.name}: ${coin.price_change_percentage_24h.toFixed(2)}%`
      );
    });
}

analyzeMomentum();

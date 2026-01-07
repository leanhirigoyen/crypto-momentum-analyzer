import fs from "fs";

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
function loadPreviousData() {
  try {
    const raw = fs.readFileSync("previous.json", "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return {};
  }
}
async function analyzeMomentum() {
const previous = loadPreviousData();

const data = await getMarketData();

const sorted = [...data].sort(
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
// 3️⃣ CAMBIOS DE MOMENTUM (ESTO VA AFUERA)
console.log("\n🚨 Cambios de momentum:");

let foundChanges = false;

data.forEach((coin) => {
  const prev = previous[coin.id];
  const now = coin.price_change_percentage_24h;

  if (prev !== undefined) {
    if (prev < 0 && now > 0) {
      console.log(
        `⬆️ ${coin.name} pasó de ${prev.toFixed(2)}% a ${now.toFixed(2)}%`
      );
      foundChanges = true;
    }

    if (prev > 0 && now < 0) {
      console.log(
        `⬇️ ${coin.name} pasó de ${prev.toFixed(2)}% a ${now.toFixed(2)}%`
      );
      foundChanges = true;
    }
  }
});

if (!foundChanges) {
  console.log("Sin cambios relevantes desde la última ejecución.");
}
}

analyzeMomentum();

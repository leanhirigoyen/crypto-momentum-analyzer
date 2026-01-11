# Crypto Momentum Analyzer 

## What it is: 
A Node.js script that uses the CoinGecko API to analyze cryptocurrency momentum over the last 24 hours.

## What it does:
- Retrieves market data for various cryptocurrencies. 
- Displays the 3 coins with the biggest gains in 24 hours. 
- Displays the 3 coins with the biggest drops in 24 hours (if any). 
- Detects momentum changes between runs.

## How to use it:
Install dependencies: npm install

Run the script: node index.js

Next steps: 
- Persist historical data to analyze trends. 
- Expose the analysis as a REST API. 
- Integrate automatic alerts for momentum changes.

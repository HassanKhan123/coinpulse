/* eslint-disable react-hooks/error-boundaries */
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
// import CandlestickChart from "@/components/CandlestickChart";
import { fetcher } from "@/lib/coingecko.actions";
import { CoinOverviewFallback } from "./fallback";

const CoinOverview = async () => {
  try {
    const [coin, coinOHLCData] = await Promise.all([
      fetcher<CoinDetailsData>("/coins/bitcoin", {
        dex_pair_format: "symbol",
      }),
      //   fetcher<OHLCData[]>("/coins/bitcoin/ohlc", {
      //     vs_currency: "usd",
      //     days: 1,
      //     interval: "hourly",
      //     precision: "full",
      //   }),
    ]);

    return (
      <div id="coin-overview">
        <div className="header pt-2">
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={56}
            height={56}
          />
          <div className="info">
            <p>
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>

            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching coin overview:", error);
    return <CoinOverviewFallback />;
  }
};

export default CoinOverview;

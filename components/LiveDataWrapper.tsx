"use client";

import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import CoinHeader from "./CoinHeader";
import CandlestickChart from "./CandleStickChart";

const LiveDataWrapper = ({
  coinId,
  poolId,
  coin,
  coinOHLCData,
}: LiveDataProps) => {
  const [liveInterval, setLiveInterval] = useState<"1s" | "1m">("1s");

  return (
    <section id="live-data-wrapper">
      <CoinHeader
        name={coin.name}
        image={coin.image.large}
        livePrice={coin.market_data.current_price.usd}
        livePriceChangePercentage24h={
          coin.market_data.price_change_percentage_24h_in_currency.usd
        }
        priceChangePercentage30d={
          coin.market_data.price_change_percentage_30d_in_currency.usd
        }
        priceChange24h={coin.market_data.price_change_24h_in_currency.usd}
      />
      <Separator className="divider" />

      <div className="trend">
        <CandlestickChart
          coinId={coinId}
          data={coinOHLCData}
          mode="live"
          initialPeriod="daily"
          liveInterval={liveInterval}
          setLiveInterval={setLiveInterval}
        >
          <h4>Trend Overview</h4>
        </CandlestickChart>
      </div>
    </section>
  );
};

export default LiveDataWrapper;

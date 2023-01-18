import React from "react";
import "./styles.css";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

function List({ coin }) {
  return (
    <tr className="list-row">
      <td className="td-img">
        <img src={coin.image} className="coin-image coin-image-td" />
      </td>

      <td className="td-info">
        <div className="info-flex">
          <p className="coin-symbol">{coin.symbol}</p>
          <p className="coin-name">{coin.name}</p>
        </div>
      </td>

      {coin.price_change_percentage_24h >= 0 ? (
        <td>
          <div className="chip-flex">
            <div className="price-chip">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="chip-icon td-chip-icon">
              <TrendingUpRoundedIcon />
            </div>
          </div>
        </td>
      ) : (
        <td>
          <div className="chip-flex">
            <div className="price-chip red">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="chip-icon td-chip-icon red">
              <TrendingDownRoundedIcon />
            </div>
          </div>
        </td>
      )}
      {coin.price_change_percentage_24h >= 0 ? (
        <td className="current-price  td-current-price">
          ${coin.current_price.toLocaleString()}
        </td>
      ) : (
        <td className="current-price-red td-current-price">
          ${coin.current_price.toLocaleString()}
        </td>
      )}
      <td className="coin-name td-totalVolume">
        {coin.total_volume.toLocaleString()}
      </td>
      <td className="coin-name td-marketCap">
        ${coin.market_cap.toLocaleString()}
      </td>
    </tr>
  );
}

export default List;

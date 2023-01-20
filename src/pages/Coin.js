import { getDateRangePickerDayUtilityClass } from "@mui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Info from "../components/CoinPage/Info";
import LineChart from "../components/CoinPage/LineChart";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";
import { gettingDate } from "../functions/getDate";

function Coin() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [{}] });
  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(30);

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = () => {
    setLoading(true);
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        if (response.data) {
          setCoin({
            id: response.data.id,
            name: response.data.name,
            symbol: response.data.symbol,
            image: response.data.image.large,
            desc: response.data.description.en,
            price_change_percentage_24h:
              response.data.market_data.price_change_percentage_24h,
            total_volume: response.data.market_data.total_volume.usd,
            current_price: response.data.market_data.current_price.usd,
            market_cap: response.data.market_data.market_cap.usd,
          });
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e.message);
        setError(true);
        setLoading(false);
      });

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${30}&interval=daily`
      )
      .then((response) => {
        if (response.data) {
          console.log("Prices>>>", response.data.prices);
          const prices = response.data.prices;
          setChartData({
            labels: prices.map((data) => gettingDate(data[0])),
            datasets: [
              {
                label: coin.name,
                data: prices.map((data) => data[1]),
                borderWidth: 1,
                fill: false,
                backgroundColor: "rgba(58, 128, 233,0.1)",
                tension: 0.25,
                borderColor: "#3a80e9",
                pointRadius: 0,
              },
            ],
          });
          setLoading(false);
        }
      })
      .catch((e) => {
        console.log(e.message);
        setError(true);
        setLoading(false);
      });
  };

  return (
    <>
      <Header />
      {!error && !loading && coin.id ? (
        <>
          <div className="grey-wrapper">
            <List coin={coin} delay={0.5} />
          </div>
          <div className="grey-wrapper">
            <LineChart chartData={chartData} />
          </div>
          <Info title={coin.name} desc={coin.desc} />
        </>
      ) : error ? (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, Couldn't find the coin you're looking for 😞
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <a href="/dashboard">
              <Button text="Dashboard" />
            </a>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Coin;

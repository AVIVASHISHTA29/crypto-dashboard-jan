import { getDateRangePickerDayUtilityClass } from "@mui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Info from "../components/CoinPage/Info";
import Button from "../components/Common/Button";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import List from "../components/Dashboard/List";

function Coin() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coin, setCoin] = useState({});

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
          console.log("DATA", {
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
          // setCoin(response.data);
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
  };

  return (
    <>
      <Header />
      {!error && !loading && coin.id ? (
        <>
          <div className="grey-wrapper">
            <List coin={coin} delay={0.5} />
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

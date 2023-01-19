import { getDateRangePickerDayUtilityClass } from "@mui/lab";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
          console.log("DATA", response.data);
          setCoin(response.data);
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
      {!error && !loading ? (
        <h1>{coin.id}</h1>
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

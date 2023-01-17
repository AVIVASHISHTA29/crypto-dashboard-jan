import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import TabsComponent from "../components/Dashboard/Tabs";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get 100 Coins
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        console.log("RESPONSE>>>", response.data);
        setCoins(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("ERROR>>>", error.message);
      });
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <TabsComponent />
          {/* {coins.map((coin, i) => (
            <p key={i}>
              {i + 1}.{coin.name}
            </p>
          ))} */}
        </>
      )}
    </div>
  );
}

export default Dashboard;

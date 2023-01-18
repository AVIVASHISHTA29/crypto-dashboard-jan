import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import Search from "../components/Dashboard/Search";
import TabsComponent from "../components/Dashboard/Tabs";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";

function Dashboard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };

  // var filteredCoins = coins.filter((coin) => {
  //   if (
  //     coin.name.toLowerCase().includes(search.trim().toLowerCase()) ||
  //     coin.symbol.toLowerCase().includes(search.trim().toLowerCase())
  //   ) {
  //     return coin;
  //   }
  // });

  var filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.trim().toLowerCase())
  );

  // Get the button
  let mybutton = document.getElementById("top-btn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      mybutton.style.display = "flex";
    } else {
      mybutton.style.display = "none";
    }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Search search={search} handleChange={handleChange} />
          <TabsComponent coins={filteredCoins} />
        </>
      )}
      <div
        className="top-btn"
        id="top-btn"
        onClick={() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }}
      >
        <ExpandLessRoundedIcon />
      </div>
    </div>
  );
}

export default Dashboard;

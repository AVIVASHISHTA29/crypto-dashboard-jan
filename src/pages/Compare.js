import React, { useEffect, useState } from "react";
import Info from "../components/CoinPage/Info";
import Header from "../components/Common/Header";
import Loader from "../components/Common/Loader";
import SelectCoins from "../components/ComparePage/SelectCoins";
import List from "../components/Dashboard/List";
import { get100Coins } from "../functions/get100Coins";
import { getCoinData } from "../functions/getCoinData";
import { settingCoinObject } from "../functions/settingCoinObject";

function Compare() {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  // id states
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  // data states
  const [coin1Data, setCoin1Data] = useState({});
  const [coin2Data, setCoin2Data] = useState({});
  // days state

  const [days, setDays] = useState(30);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const coins = await get100Coins();
    if (coins) {
      setAllCoins(coins);
      const data1 = await getCoinData(crypto1);
      const data2 = await getCoinData(crypto2);
      settingCoinObject(data1, setCoin1Data);
      settingCoinObject(data2, setCoin2Data);
      setLoading(false);
    }
  };

  const onCoinChange = async (e, isCoin2) => {
    setLoading(true);
    if (isCoin2) {
      // crypto2 is being changed
      setCrypto2(e.target.value);
      // fetch coin2 data
      const data2 = await getCoinData(e.target.value);
      settingCoinObject(data2, setCoin2Data);
    } else {
      // crypto1 is being changed
      setCrypto1(e.target.value);
      // fetch coin1 data
      const data1 = await getCoinData(e.target.value);
      settingCoinObject(data1, setCoin1Data);
    }
    setLoading(false);
  };

  const handleDaysChange = (e) => {
    setDays(e.target.value);
  };

  return (
    <div>
      {loading || !coin1Data?.id || !coin2Data?.id ? (
        <Loader />
      ) : (
        <>
          <Header />
          <SelectCoins
            allCoins={allCoins}
            crypto1={crypto1}
            crypto2={crypto2}
            onCoinChange={onCoinChange}
            days={days}
            handleDaysChange={handleDaysChange}
          />
          <div className="grey-wrapper">
            <List coin={coin1Data} />
          </div>
          <div className="grey-wrapper">
            <List coin={coin2Data} />
          </div>
          <Info title={coin1Data.name} desc={coin1Data.desc} />
          <Info title={coin2Data.name} desc={coin2Data.desc} />
        </>
      )}
    </div>
  );
}

export default Compare;

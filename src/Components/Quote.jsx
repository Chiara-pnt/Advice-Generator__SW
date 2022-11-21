import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
import ButtonDice from "./ButtonDice";
import Patterns from "./Patterns";

const APIURL = "https://api.adviceslip.com/advice";

const Quote = () => {
  const [advice, setAdvice] = useState({});
  const [intervalId, setIntervalId] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetch(APIURL);
    const data = await response.json();

    setAdvice(data.slip);
  };

  useEffect(() => {
    fetchData();
    setLoading(false);

    setIntervalId(
      setInterval(() => {
        fetchData();
      }, 60000)
    );
    clearInterval(intervalId);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading">...Loading</div>
      ) : (
        <>
          <Header advice={advice} loading={loading} />
          <div className="quote">{loading ? "...Loading" : advice.advice}</div>
        </>
      )}
      <Patterns />
      <ButtonDice fetchData={fetchData} intervalId={intervalId} />
    </div>
  );
};

export default Quote;

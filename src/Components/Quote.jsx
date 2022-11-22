import React from "react";
import { useState, useEffect } from "react";
import Header from "./Header";
import ButtonDice from "./ButtonDice";
import Patterns from "./Patterns";

const APIURL = "https://api.adviceslip.com/advice";

const Quote = () => {
  const [advice, setAdvice] = useState({});
  const [intervalId, setIntervalId] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(APIURL); // no cache -> fetching before the 2s limit of api
      const data = await response.json();
      setAdvice(data.slip);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setIntervalId(
      setInterval(() => {
        fetchData();
      }, 60000)
    );
  }, []);

  return (
    <div className="elements">
      <Header advice={advice} loading={loading} />
      <div className="quote">{advice.advice}</div>
      <Patterns />
      <ButtonDice
        fetchData={fetchData}
        intervalId={intervalId}
        setIntervalId={setIntervalId}
        loading={loading}
      />
    </div>
  );
};

export default Quote;

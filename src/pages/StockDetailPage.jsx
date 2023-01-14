import { useEffect } from "react";
import { useParams } from "react-router-dom";
import finnHub from "../apis/finnHub";

export const StockDetailPage = () => {
  const { symbol } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);
      const oneWeek = currentTime - 7 * 24 * 60 * 60;
      const oneYear = currentTime - 365 * 24 * 60 * 60;
      let oneDay;
      if (date.getDay() === 6) {
        oneDay = currentTime - 2 * 24 * 60 * 60;
      } else if (date.getDay() === 0) {
        oneDay = currentTime - 3 * 24 * 60 * 60;
      } else {
        oneDay = currentTime - 24 * 60 * 60;
      }
      try {
        const responses = await Promise.all([
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDay,
              to: currentTime,
              resolution: 30,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeek,
              to: currentTime,
              resolution: 30,
            },
          }),
          finnHub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYear,
              to: currentTime,
              resolution: "W",
            },
          }),
        ]);
        console.log(responses);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  });
  return <div>Stock Detail Page {symbol}</div>;
};

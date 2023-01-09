import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

export const StockList = () => {
  // eslint-disable-next-line
  const [stock, setStock] = useState();
  // eslint-disable-next-line
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      //const responses = [];
      try {
        const responses = await Promise.all(watchList.map((stock) => {
          return finnHub.get("/quote", {
            params: {
              symbol: stock
            }
          })
        }));
        console.log(responses);
        if (isMounted) {
          setStock(responses);
        }
      } catch (error) {}
    };
    fetchData();
    return () => (isMounted = false);
  }, []);
  return <div>StockList</div>;
};

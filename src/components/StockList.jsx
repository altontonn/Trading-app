import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

export const StockList = () => {
  // eslint-disable-next-line
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finnHub.get('/quote', {
          params: {
            symbol: 'MSFT'
          }
        });
        console.log(response);
      } catch (error) {

      }
    }
    fetchData()
  }, [])
  return (
    <div>StockList</div>
  )
};

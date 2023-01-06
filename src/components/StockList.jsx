import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";

export const StockList = () => {
  let isMounted = true;
  // eslint-disable-next-line
  const [stock, setStock] = useState();
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
        if (isMounted) {
          setStock(response.data)
        }
      } catch (error) {

      }
    }
    fetchData();
    return () => (isMounted = false);
  }, [])
  return (
    <div>StockList</div>
  )
};

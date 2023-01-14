import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";

export const StockList = () => {
  // eslint-disable-next-line
  const [stock, setStock] = useState();
  const { watchList } = useContext(WatchListContext);
  const navigate = useNavigate();

  const changeColor = (change) => {
    return (
      change > 0 ? "Success" : "danger" 
    )
  }
  const renderIcon = (change) => {
    return (
      change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />
    )
  }
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
        //console.log(responses);
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol
          }
        })
        //console.log(data);
        if (isMounted) {
          setStock(data);
        }
      } catch (error) {}
    };
    fetchData();
    return () => (isMounted = false);
  }, [watchList]);

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`)
  }

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{color: "rgb(79, 89, 102)"}}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock.map((stockData) => (
            <tr style ={{ cursor: "pointer" }} onClick={() => handleStockSelect(stockData.symbol)} className="table-row" key={stockData.symbol}>
              <th scope="row">{stockData.symbol}</th>
              <td>{stockData.data.c}</td>
              <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d}{renderIcon(stockData.data.dp)}</td>
              <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.dp}{renderIcon(stockData.data.dp)}</td>
              <td>{stockData.data.h}</td>
              <td>{stockData.data.l}</td>
              <td>{stockData.data.o}</td>
              <td>{stockData.data.pc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

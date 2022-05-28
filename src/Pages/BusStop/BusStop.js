import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import "./BusStop.scss";
import first from "./ch1.json";

import third from "./ch3.json";
import fourth from "./ch4.json";
import fifth from "./ch5.json";
import sixth from "./ch6.json";
const BusStop = () => {
  const [currentData, setCurrentData] = useState([]);
  const [search, setSearch] = useState("");
  const { id } = useParams();
  useEffect(() => {
    switch (id) {
      case "1":
        setCurrentData([...first, ...third]);
        break;

      case "3":
        setCurrentData(third);
        break;
      case "4":
        setCurrentData(fourth);
        break;
      case "5":
        setCurrentData(fifth);
        break;
      case "6":
        setCurrentData(sixth);
        break;
      default:
        setCurrentData(first);
        break;
    }
  }, [id]);
  return (
    <div className="container">
      <input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      
      <div className="box1">
        <div className="title">
        {currentData.map((item) => {
          return (
            <div className="inside">
            <ul>
              <li>{item.label}</li>
            </ul>
            </div>
          );
          
        })}
        </div>
        </div>
        </div>
    
  );
};
export { BusStop };

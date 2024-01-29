import React, { useEffect, useState } from "react";
import "./Detail_Table.css";
import { Link } from "react-router-dom";
import axios from "axios";
import PrintableDetailTable from "./PrintableDetailTable";

const Detail_Table = () => {
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://63abcd5afdc006ba6065fdac.mockapi.io/n1/data"
      );
      setList(response.data);
      setLoading(false);
    } catch (error) {
      alert("Error");
    }
  };

  return (
    <>
      <div>
        <h1>DETAILS</h1>
        <Link to={"/header"} className="button">
          Add Item
        </Link>
      </div>
      {isLoading ? (
        <div className="spinner-border m-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <PrintableDetailTable list={list} />
      )}
    </>
  );
};

export default Detail_Table;
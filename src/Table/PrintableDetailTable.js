import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

const PrintableDetailTable = ({ list }) => {
  const tableRef = useRef(null);

  return (
    <>
      <div id="print-content-table" ref={tableRef}>
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Date</th>
             
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.itemCode}</td>
                <td>{item.itemName}</td>
                <td>{item.quantity}</td>
                <td>{item.amount}</td>
                <td>{formatDate(item.date)}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="4">Total:</td>
              <td>{getTotal(list)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ReactToPrint
        trigger={() => <button>Print All</button>}
        content={() => tableRef.current}
      />
    </>
  );
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const getTotal = (list) => {
  const totalAmount = list.reduce(
    (acc, curr) => acc + parseFloat(curr.amount),
    0
  );
  return totalAmount.toFixed(2);
};

export default PrintableDetailTable;
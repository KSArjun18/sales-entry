import React, { useState } from "react";
import "./Header_table.css";
import axios from "axios";


const Header_table = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [formData, setFormData] = useState({
    itemCode: "",
    itemName: "",
    quantity: "",
    amount: "",
    currentDate: "",
  });
  const [errors, setErrors] = useState({});
  const handleInputChange = (event) => {
    // console.log(event)
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleClick = () => {
    window.history.back();
  };
  const validateForm = () => {
    const newErrors = {};

    if (!formData.itemCode) {
      newErrors.itemCode = "Item Code is required";
    }

    if (!formData.itemName) {
      newErrors.itemName = "Item Name is required";
    }

    if (!formData.quantity || isNaN(formData.quantity)) {
      newErrors.quantity = "Quantity is required and must be a number";
    }

    if (!formData.amount || isNaN(formData.amount)) {
      newErrors.amount = "Amount is required and must be a number";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const newData = await axios.post(
          "https://63abcd5afdc006ba6065fdac.mockapi.io/n1/data",
          formData
        );
        window.location.href = "/";
        console.log(newData);
        // alert("sucess")
        setFormData({
          itemCode: "",
          itemName: "",
          quantity: "",
          amount: "",
          currentDate: "",
        });
      } catch (error) {
        console.log("Error message: ", error.message);
        if (error.response) {
          console.log("Status: ", error.response.status);
          console.log("Data: ", error.response.data);
        }
      }
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <label>Item Code</label>
            <input
              type={"text"}
              name="itemCode"
              value={formData.itemCode}
              onChange={handleInputChange}
              className={
                errors.itemCode ? "form-control error" : "form-control"
              }
            />
            {errors.itemCode && (
              <p className="error-message">{errors.itemCode}</p>
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Item Name</label>
            <input
              type={"text"}
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              className={
                errors.itemName ? "form-control error" : "form-control"
              }
            />
            {errors.itemName && (
              <p className="error-message">{errors.itemName}</p>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="form-group">
            <label>Quantity</label>
            <input
              type={"text"}
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className={
                errors.quantity ? "form-control error" : "form-control"
              }
            />
            {errors.quantity && (
              <p className="error-message">{errors.quantity}</p>
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="form-group">
            <label>Amount</label>
            <input
              type={"text"}
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className={errors.amount ? "form-control error" : "form-control"}
            />
            {errors.amount && <p className="error-message">{errors.amount}</p>}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group">
            <label>Current Date</label>
            <input
              type={"date"}
              name="currentDate"
              value={currentDate.toISOString().slice(0, 10)}
              className="form-control"
            />
          </div>
        </div>
        <button type={"submit"} onClick={handleSubmit}>
          insert
        </button>
        <button className="back-button" onClick={handleClick}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Header_table;

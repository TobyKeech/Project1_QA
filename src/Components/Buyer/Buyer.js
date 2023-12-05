import React, { useState } from "react";
import BuyerInputForm from "./BuyerInputForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { useEffect, useReducer } from "react";

const Buyer = () => {
  const [loading, setLoading] = useState(true);
  const [buyers, setBuyers] = useState([]);
  // used during testing to display the inital list from the backend into a list (see early commits)
  const [saving, setSaving] = useState(false);

  const reducedBuyersList = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter((buyer) => buyer.id !== action.payload.id);
      default:
        return state;
    }
  };

  const [listOfBuyers, dispatch] = useReducer(reducedBuyersList, []);
  const [showBuyerInputForm, setShowBuyerInputForm] = useState(false);

  const buyerAddHandler = (newBuyer) => {
    if (
      listOfBuyers.filter(
        (buyer) =>
          buyer.firstName === newBuyer.firstName &&
          buyer.surname === newBuyer.surname
      ).length
    ) {
      alert("Buyer already in the list");
      return;
    }

    setSaving(true);
    fetch("http://localhost:8081/buyer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBuyer),
    })
      .then((response) => {
        if (!response.ok) {
          alert("error has occurred, unable to add buyer");
          setSaving(false);
          throw response.status;
        } else return response.json();
      })
      .then((newBuyer) => {
        dispatch({ type: "ADD", payload: newBuyer });
        setSaving(false);
      });
  };

  const deleteBuyerHandler = (buyer) => {
    setSaving(true);

    fetch(`http://localhost:8081/buyer/${buyer.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          alert("An error has occurred. Unable to delete buyer");
          setSaving(false);
          throw response.status;
        } else {
          dispatch({ type: "REMOVE", payload: buyer });
          setSaving(false);
        }
      })
      .catch((error) => {
        setSaving(false);
        console.log(error);
        alert("Error has occurred while deleting the buyer");
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8081/buyer")
      .then((response) => {
        if (!response.ok) {
          alert("Error occurred, could not load data of buyers");
          throw response.status;
        } else return response.json();
      })
      .then((buyers) => {
        dispatch({ type: "SET", payload: buyers });
        setLoading(false);
        setBuyers(buyers);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("Error has occurred getting the data");
      });
  }, []);

  const toggleBuyerInputForm = () => {
    setShowBuyerInputForm((prevShowForm) => !prevShowForm);
  };

  return (
    <>
      <div className="bg-body-tertiary text-white p-4">
        {showBuyerInputForm && <BuyerInputForm buyerAddHandler={buyerAddHandler} />}
        <br />
        {loading || saving ? (
          <div>
            {loading ? "Loading buyers Information" : ""}
            {saving ? "Saving buyer Information" : ""}
          </div>
        ) : (
          ""
        )}
        <button  className={`btn ${showBuyerInputForm ? 'btn-outline-danger' : 'btn-outline-success'} mb-2 p-2`} onClick={toggleBuyerInputForm}>
          {showBuyerInputForm 
          ?( <> <FontAwesomeIcon icon={faMinus}/> Form</>) 
          : (<><FontAwesomeIcon icon={faPlus}/> Buyer</>)}
        </button>
    
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Address</th>
              <th scope="col">Postcode</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listOfBuyers.length === 0 && !loading ? (
              <tr>
                <td colSpan="5">No buyers found</td>
              </tr>
            ) : (
              listOfBuyers.map((buyer) => (
                <tr key={buyer.id}>
                  <td>{buyer.firstName}</td>
                  <td>{buyer.surname}</td>
                  <td>{buyer.address}</td>
                  <td>{buyer.postcode}</td>
                  <td>{buyer.phone}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this buyer?")) {
                          deleteBuyerHandler(buyer);
                        }
                      }}
                    >
                      Delete&nbsp;
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Buyer;

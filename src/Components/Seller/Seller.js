import { useEffect, useReducer, useState } from "react";
import SellerForm from "./SellerForm";

const Seller = () => {
  const [loading, setLoading] = useState(true);
  const [sellers, setSellers] = useState([]);
  const [saving, setSaving] = useState(false);

  const reducedSellersList = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter((seller) => seller.id !== action.payload.id);
      default:
        return state;
    }
  };

  const [listOfSellers, dispatch] = useReducer(reducedSellersList, []);

  const addSellerHandler = (newSeller) => {
    if (
      listOfSellers.filter(
        (seller) =>
          seller.firstName === newSeller.firstName &&
          seller.surname === newSeller.surname
      ).length
    ) {
      alert("Seller already exists in the list");
      return;
    }
    setSaving(true);

    fetch("http://localhost:8081/seller", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSeller),
    })
      .then((response) => {
        if (!response.ok) {
          alert("An error has occurred. Unable to create item");
          setSaving(false);
          throw response.status;
        } else return response.json();
      })
      .then((newSeller) => {
        dispatch({ type: "ADD", payload: newSeller });
        setSaving(false);
      });
  };

  const deleteSellerHandler = (seller) => {
    setSaving(true);

    fetch(`http://localhost:8081/seller/${seller.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          alert("An error has occurred. Unable to delete item");
          setSaving(false);
          throw response.status;
        } else {
          dispatch({ type: "REMOVE", payload: seller });
          setSaving(false);
        }
      })
      .catch((error) => {
        setSaving(false);
        console.log(error);
        alert("Error has occurred while deleting the seller");
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8081/seller")
      .then((response) => {
        if (!response.ok) {
          alert("Error occurred, could not load data of sellers");
          throw response.status;
        } else return response.json();
      })
      .then((sellers) => {
        dispatch({ type: "SET", payload: sellers });
        setLoading(false);
        setSellers(sellers);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("Error has occurred while getting the data");
      });
  }, []);

  return (
    <>
      <SellerForm addSellerHandler={addSellerHandler} />
      {loading || saving ? (
        <div>
          {loading ? "Loading Sellers Information" : ""}
          {saving ? "Saving Seller Information" : ""}
        </div>
      ) : (
        ""
      )}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Surname</th>
            <th>Address</th>
            <th>Postcode</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listOfSellers.length === 0 && !loading ? (
            <tr>
              <td colSpan="6">No sellers found</td>
            </tr>
          ) : (
            listOfSellers.map((seller) => (
              <tr key={seller.id}>
                <td>{seller.firstName}</td>
                <td>{seller.surname}</td>
                <td>{seller.address}</td>
                <td>{seller.postcode}</td>
                <td>{seller.phone}</td>
                <td>
                  <button onClick={() => deleteSellerHandler(seller)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default Seller;

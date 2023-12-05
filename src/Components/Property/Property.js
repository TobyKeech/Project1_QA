import React, { useEffect, useState, useReducer } from "react";
import PropertySearchForm from "./PropertySearchForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropertyAddForm from "./PropertyAddForm";
import PropertyEditForm from "./PropertyEditForm";
import {
  faTrash,
  faBed,
  faTree,
  faHouseChimney,
  faMapPin,
  faMinus,
  faPlus,
  faMagnifyingGlass,
  faPenToSquare,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";

const Property = () => {
  const reducedPropertiesList = (state, action) => {
    switch (action.type) {
      case "ADD":
        return state.concat(action.payload);
      case "SET":
        return action.payload;
      case "REMOVE":
        return state.filter((property) => property.id !== action.payload.id);
      default:
        return state; 
    }
  };

  const [listOfProperties, dispatch] = useReducer(reducedPropertiesList, []);
  const [showPropertyInputForm, setShowPropertyInputForm] = useState(false);
  const [showPropertySearchForm, setShowPropertySearchForm] = useState(false);
  const [showPropertyEditForm, setShowPropertyEditForm] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [editedProperty, setEditedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const searchHandlerForForm = (searchInput) => {
    setSearchResult(
      listOfProperties.filter(
        (property) =>
          (searchInput.type === "ANY" || property.type === searchInput.type) &&
          Number(property.bathroom) >= Number(searchInput.bathroom) &&
          Number(property.bedroom) >= Number(searchInput.bedroom) &&
          Number(property.garden) >= Number(searchInput.garden) &&
          (Number(searchInput.price) === 0 ||
            Number(property.price) <= Number(searchInput.price))
      )
    );
  };

  const propertyAddHandler = (newProperty) => {
    fetch("http://localhost:8081/property", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Error occurred while adding a property");
          setSaving(false);
          throw response.status;
        }
        return response.json();
      })
      .then((newProperty) => {
        dispatch({ type: "ADD", payload: newProperty });
        setSaving(false);
      });
  };

  const deletePropertyHandler = (property) => {
    setSaving(true);

    fetch(`http://localhost:8081/property/${property.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          alert("An error has occurred. Unable to delete property");
          setSaving(false);
          throw response.status;
        } else {
          dispatch({ type: "REMOVE", payload: property });
          setSaving(false);
        }
      })
      .catch((error) => {
        setSaving(false);
        console.log(error);
        alert("Error has occurred while deleting the property");
      });
  };

  const editPropertyHandler = (property) => {
    fetch(`http://localhost:8081/property/${property.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    })
      .then((response) => {
        if (!response.ok) {
          alert("An error has occurred, unable to edit property");
          setSaving(false);
          throw response.status;
        }
        return response.json();
      })
      .then((updatedProperty) => {
        dispatch({
          type: "SET",
          payload: listOfProperties.map((p) =>
            p.id === updatedProperty.id ? updatedProperty : p
          ),
        });
        setSaving(false);
      })
      .catch((error) => {
        setSaving(false);
        console.log(error);
        alert("Error has occurred while editing the property");
      });
  };

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8081/property")
      .then((response) => {
        if (!response.ok) {
          alert("Error occurred, could not load data of properties");
          throw response.status;
        }
        return response.json();
      })
      .then((properties) => {
        dispatch({ type: "SET", payload: properties });
        setSearchResult(properties);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("Error has occurred getting the data");
      });
  }, []);

  useEffect(() => {
    dispatch({ type: "SET", payload: listOfProperties });
    setSearchResult(listOfProperties);
  }, [listOfProperties]);

  const togglePropertyInputForm = () => {
    setShowPropertyInputForm((prevShowForm) => !prevShowForm);
  };

  const togglePropertySearchForm = () => {
    setShowPropertySearchForm((prevShowForm) => !prevShowForm);
  };

  const togglePropertyEditForm = () => {
    setShowPropertyEditForm((prevShowForm) => !prevShowForm);
  };

  const startEditProperty = (property) => {
    setEditedProperty(property);
  };

  return (
    <>
      <div className="bg-body-tertiary text-white p-4">
        {showPropertyInputForm && (
          <PropertyAddForm propertyAddHandler={propertyAddHandler} />
        )}

        <br />

        {showPropertySearchForm && (
          <PropertySearchForm searchHandlerForForm={searchHandlerForForm} />
        )}

        <br />

        {showPropertyEditForm && (
          <PropertyEditForm
            property={editedProperty}
            editPropertyHandler={editPropertyHandler}
            onClose={() => setShowPropertyEditForm(false)}
          />
        )}

        {loading || saving ? (
          <div>
            {loading ? "Loading Properties Information" : ""}
            {saving ? "Saving Properties Information" : ""}
          </div>
        ) : (
          ""
        )}

        <div className="d-flex justify-content-center align-items-center flex-column">
          <button
            className={`btn ${
              showPropertySearchForm
                ? "btn-outline-danger"
                : "btn-outline-success"
            } mb-2 p-2`}
            onClick={togglePropertySearchForm}
          >
            {showPropertySearchForm ? (
              <>
                <FontAwesomeIcon icon={faMinus} /> Search Form
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faMagnifyingGlass} /> for a property
              </>
            )}
          </button>
          <button
            className={`btn ${
              showPropertyInputForm
                ? "btn-outline-danger"
                : "btn-outline-success"
            } p-2`}
            onClick={togglePropertyInputForm}
          >
            {showPropertyInputForm ? (
              <>
                <FontAwesomeIcon icon={faMinus} /> Input Form
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} /> new property
              </>
            )}
          </button>
        </div>

        <div>
          <br />
          {searchResult.length === 0 && !loading ? (
            <div>No properties found</div>
          ) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {searchResult.map((property) => (
                <div key={property.id} className="col">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{property.address}</h5>
                      <p className="card-text">
                        Postcode: {property.postcode}{" "}
                        <FontAwesomeIcon
                          icon={faMapPin}
                          style={{ color: "red" }}
                        />
                      </p>
                      <p className="card-text">
                        No of Bedrooms: {property.bedroom}{" "}
                        <FontAwesomeIcon
                          icon={faBed}
                          style={{ color: "#00ace6" }}
                        />
                      </p>
                      <p className="card-text">
                        No of Gardens: {property.garden}{" "}
                        <FontAwesomeIcon
                          icon={faTree}
                          style={{ color: "green" }}
                        />
                      </p>
                      <p className="card-text">
                        Type: {property.type}{" "}
                        <FontAwesomeIcon
                          icon={faHouseChimney}
                          style={{ color: "#a86f2e" }}
                        />
                      </p>
                      <p className="card-text">
                        Price: £{property.price}{" "}
                        <FontAwesomeIcon
                          icon={faCoins}
                          style={{ color: "#dcad04" }}
                        />
                      </p>
                      <p className="card-text">Status: {property.status}</p>
                      <button
                        type="button"
                        className="btn btn-outline-danger m-1"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModal-${property.id}`}
                      >
                        Delete <FontAwesomeIcon icon={faTrash} />
                      </button>

                      <div
                        className="modal fade"
                        id={`exampleModal-${property.id}`}
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby={`exampleModalLabel-${property.id}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id={`exampleModalLabel-${property.id}`}
                              >
                                Delete Property
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              Are you sure you want to delete this property?
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                  deletePropertyHandler(property);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        className="btn btn-outline-warning"
                        onClick={() => {
                          startEditProperty(property);
                          togglePropertyEditForm();
                        }}
                      >
                        Edit <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Property;

import React from "react";
import { useEffect, useState, useReducer } from "react";
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
  faSackDollar,
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
    }
    switch (action.type) {
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
 const  [showPropertyEditForm, setShowPropertyEditForm] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [editedProperty, setEditedProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  //state that can be changed by calling upon setLoading which will update the state in this case loading

  // const [properties, setProperties] = useState([]);
  // currently state used to showcase the data onto the webpage below via a map function which returns an array of a defined value in his case of properties

  const searchHandlerForForm = (searchInput) => {
    //search handler function which we shall use in the form itself
    setSearchResult(
      listOfProperties.filter(
        (property) =>
          //we set the search result in the state to update it using below for turnery statement, we filter the list of properties from the fetch to get a single property array
          //the conditions of this are set below and is matched against the searchInput criteria that we are given in the parameter
          (searchInput.type === "ANY" || property.type === searchInput.type) &&
          Number(property.bathroom) >= Number(searchInput.bathroom) &&
          Number(property.bedroom) >= Number(searchInput.bedroom) &&
          Number(property.garden) >= Number(searchInput.garden) &&
          (Number(searchInput.price) === 0 ||
            Number(property.price) <= Number(searchInput.price))
      )
    );
  };
  //this links heavily with what is happening within the property earch form which is then filtering the data via the useRef values
  //which are updated within the property search form

  console.log(searchResult);

  const propertyAddHandler = (newProperty) => {
    fetch("http://localhost:8081/property", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProperty),
    })
      .then((reponse) => {
        if (!reponse.ok) {
          alert("error occured adding a property");
          setSaving(false);
          throw reponse.status;
        } else return reponse.json();
      })
      .then((newProperty) => {
        dispatch({ type: "ADD", payload: newProperty });
        setSaving(false);
      });
  };

  const deletePropertyHandler = (property) => {
    setSaving(true);

    fetch(`https://localhost:8081/property/${property.id}`, {
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
      //get the json content from the backend server to render

      .then((response) => {
        if (!response.ok) {
          alert("Error occured, could not load data of properties");
          throw response.status;
          //returns the status of the resonse back to the user ie 202 or 404
        } else return response.json();
        // if everything is good return the properties json data in the response
      })

      .then((properties) => {
        dispatch({ type: "SET", payload: properties });
        setSearchResult(properties);
        setLoading(false);
        //manipulates the state to set this to false whena ction is complete, this started as true above in state
        //slight change than just setting in state below. Dispatch used within useReducer and listPropertiesreducer function
        //type set to SET and corrosponding action performed within fucntion
        // setProperties(properties)
        //check what is contained within propeties, list of propeties displayed within the console
      })

      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("Error has occured getting the data");
        //bring an alert if the json data doesnt load properly
      });
  }, []);
  //this gets set into a new array to then use further down

  useEffect(() => {
    dispatch({ type: "SET", payload: listOfProperties });
    setSearchResult(listOfProperties);
  }, [listOfProperties]); // Only run when 'properties' change
  // this allows for the fresh collection of the state to allow for a refersh when a property is deleted, also sets searchResult to dispaly the new data
  //and allow the search to work as intended.

  const togglePropertyInputForm = () => {
    setShowPropertyInputForm((prevShowForm) => !prevShowForm);
  };

  const togglePropertySearchForm = () => {
    setShowPropertySearchForm((prevShowForm) => !prevShowForm);
  };

  const togglePropertyEditForm = () => {
    setShowPropertyEditForm((prevShowForm) => !prevShowForm)
  }

  const startEditProperty = (property) => {
    setEditedProperty(property);
  };


  return (
    <>
      <div className="bg-dark text-white p-4">
        {showPropertyInputForm && (
          <PropertyAddForm propertyAddHandler={propertyAddHandler} />
        )}
        {/* checks wether the showproperty iput form is true and then renders the form if it is */}
        <br />

        {showPropertySearchForm && (
          <PropertySearchForm searchHandlerForForm={searchHandlerForForm} />
        )}
        {/* property search form component, passed down function as a prop to use within the form itself*/}
        <br />

        {showPropertyEditForm && (

        <PropertyEditForm property = {editedProperty} editPropertyHandler={editPropertyHandler}/> 
        )}

        {/* property edit form that takes in the current details and then is updated with the new values taken by the edit handler */}

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
           <FontAwesomeIcon icon={faMinus}/> Search Form
            </>
            ):(
              <>
            <FontAwesomeIcon icon={faMagnifyingGlass}/> for a property
            </> )}
          </button>
          <button
  className={`btn ${
    showPropertyInputForm ? "btn-outline-danger" : "btn-outline-success"
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
                        <FontAwesomeIcon icon={faMapPin} style={{color:"red"}} />
                      </p>
                      <p className="card-text">
                        No of Bedrooms: {property.bedroom}{" "}
                        <FontAwesomeIcon icon={faBed} style={{color:"#00ace6"}}/>
                      </p>
                      <p className="card-text">
                        No of Gardens: {property.garden}{" "}
                        <FontAwesomeIcon icon={faTree} style={{color:"green"}} />
                      </p>
                      <p className="card-text">
                        Type: {property.type}{" "}
                        <FontAwesomeIcon icon={faHouseChimney} style={{color:"#a86f2e"}}/>
                      </p>
                      <p className="card-text">
                        Price: £{property.price}{" "}
                        <FontAwesomeIcon icon={faCoins} style={{color: "#dcad04"}}/>
                      </p>
                      <p className="card-text">Status: {property.status}</p>
                      <button
                        className="btn btn-outline-danger m-1"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this property?"
                            )
                          ) {
                            deletePropertyHandler(property);
                          }
                        }}
                      >
                        Delete <FontAwesomeIcon icon={faTrash} />
                      </button>
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

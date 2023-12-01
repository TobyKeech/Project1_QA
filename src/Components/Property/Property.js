import React from 'react';
import { useEffect, useState, useReducer } from 'react';
import "../Property/Property.css";
import PropertySearchForm from './PropertySearchForm';


const Property = () => {
   const reducedPropertiesList = (state, action) => {
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
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(true);
    const [ saving, setSaving] = useState(false)
    //state that can be changed by calling upon setLoading which will update the state in this case loading
    
    // const [properties, setProperties] = useState([]);
    // currently state used to showcase the data onto the webpage below via a map function which returns an array of a defined value in his case of properties

    const searchHandlerForForm = (searchInput) => {
        //search handler function which we shall use in the form itself 
        setSearchResult(listOfProperties.filter(property => 
            //we set the search result in the state to update it using below for turnery statement, we filter the list of properties from the fetch to get a single property array
            //the conditions of this are set below and is matched against the searchInput criteria that we are given in the parameter
            (searchInput.type === "ANY" || property.type === searchInput.type) &&
            (Number(property.bathroom) >= Number(searchInput.bathroom)) &&
            (Number(property.bedroom) >= Number(searchInput.bedroom)) &&
            (Number(property.garden) >= Number(searchInput.garden)) &&
            (Number(searchInput.price) === 0 || Number(property.price) <= Number(searchInput.price))
            ));
    };
    //this links heavily with what is happening within the property earch form which is then filtering the data via the useRef values
    //which are updated within the property search form

    console.log(searchResult)

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
      
   
useEffect(()=> {
    setLoading(true)
        fetch("http://localhost:8081/property")
        //get the json content from the backend server to render

        .then((response)=> {
            if( !response.ok) {
                alert("Error occured, could not load data of properties")
                throw response.status
                //returns the status of the resonse back to the user ie 202 or 404
            } else return response.json();
            // if everything is good return the properties json data in the response
        })

        .then(properties => {
               
                dispatch({type:"SET", payload: properties});
                setSearchResult(properties)
                setLoading(false);
                //manipulates the state to set this to false whena ction is complete, this started as true above in state 
                //slight change than just setting in state below. Dispatch used within useReducer and listPropertiesreducer function
                //type set to SET and corrosponding action performed within fucntion
                // setProperties(properties)
                //check what is contained within propeties, list of propeties displayed within the console
                
        })

        .catch(error => {
            setLoading(false)
            console.log(error)
            alert("Error has occured getting the data")
            //bring an alert if the json data doesnt load properly
        })
        
},[])
//this gets set into a new array to then use further down

useEffect(() => {
    dispatch({ type: "SET", payload: listOfProperties });
    setSearchResult(listOfProperties);
  }, [listOfProperties]); // Only run when 'properties' change

    return ( 
        <>
            <div className='pageHeader'><b>Property Search and Booking</b></div>
            <PropertySearchForm searchHandlerForForm = {searchHandlerForForm}/>
            {/* property search form component, passed down funcrion as a prop to use within the form itself*/}

 {loading || saving ? (
        <div>
          {loading ? "Loading Properties Information" : ""}
          {saving ? "Saving Properties Information" : ""}
        </div>
      ) : (
        ""
      )}
    <table>
        <thead>
            <tr>
                <th>Address</th>
                <th>Postcode</th>
                <th>No of Gardens</th>
                <th>Type</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {
                searchResult.length === 0 && !loading ?
                    <tr>
                        <td colSpan="6">No properties found</td>
                    </tr>
                    :
                    searchResult.map((property => (
                        <tr key={property.id}>
                            <td>{property.address}</td>
                            <td>{property.postcode}</td>
                            <td>{property.garden}</td>
                            <td>{property.type}</td>
                            <td>{property.status}</td>
                            <td>
                                <button onClick={() => deletePropertyHandler(property)}>
                                    Delete</button>
                            </td>
                        </tr>
                    ))
            )}
        </tbody>
    </table>     
    </>
     );
}
 
export default Property;
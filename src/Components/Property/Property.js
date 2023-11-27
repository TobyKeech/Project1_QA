import React from 'react';
import { useEffect, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import "../Property/Property.css";
import PropertySearchForm from './PropertySearchForm';


const Property = () => {
    const reducedPropertiesList = (state, action) => {
        switch(action.type){
          case "SET":
              return action.payload;
          default:
            return state;
        }
      }

    const [listOfProperties, dispatch] = useReducer(reducedPropertiesList, []);
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(true);
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

    console.log(searchResult)
    


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



    return ( 
        <>
            <div className='pageHeader'><b>Property Search and Booking</b></div>
            <PropertySearchForm searchHandlerForForm = {searchHandlerForForm}/>
            {/* property search form component, passed down funcrion as a prop to use within the form itself*/}

{
        loading ?
        <div>
               Loading properties Information
                
        </div>
            : ""
      }
    <ul>
        {
            searchResult.length === 0 && !loading ?
                <li>
                      &nbsp;No properties found
                </li>
                :
                searchResult.map(properties => (
                    <li key={properties.id}>
                          {properties.firstName}&nbsp;{properties.surname}
                          {properties.address}&nbsp;{properties.postcode}
                          {properties.phone}&nbsp;
                          {properties.type}&nbsp;
                    </li>
                ))}
    </ul>
      
    </>
     );
}
 
export default Property;
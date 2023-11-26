import React from 'react';
import { useEffect, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';


const Property = () => {


    const [loading, setLoading] = useState(true);
    //state that can be changed by calling upon setLoading which will update the state in this case loading
    const [searchResult, setSearchResult] = useState([]);

    const [properties, setProperties] = useState([]);
    // currently state used to showcase the data onto the webpage below via a map function which returns an array of a defined value in his case of properties


    const reducedPropertiesList = (state, action) => {
      switch(action.type){
        case "SET":
            return action.payload;
        default:
          return state;
      }
    }

    const [listOfProperties, dispatch] = useReducer(reducedPropertiesList, []);


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
                setLoading(false);
                //manipulates the state to set this to false whena ction is complete, this started as true above in state 
                console.log(properties)
                dispatch({type:"SET", payload: properties});
                //slight change than just setting in state below. Dispatch used within useReducer and listPropertiesreducer function
                //type set to SET and corrosponding action performed within fucntion
                setProperties(properties)
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

{
        loading ?
        <div>
                {loading ? "Loading properties Information" : ""}
                
        </div>
            : ""
      }
    <ul>
        {
            listOfProperties.length === 0 && !loading ?
                <li>
                      &nbsp;No properties found
                </li>
                :
                listOfProperties.map(properties => (
                    <li key={properties.id}>
                          {properties.firstName}&nbsp;{properties.surname}
                          {properties.address}&nbsp;{properties.postcode}
                          {properties.phone}&nbsp;
                    </li>
                ))}
    </ul>
      
    </>
     );
}
 
export default Property;
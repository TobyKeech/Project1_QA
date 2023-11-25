import React from 'react';
import { useEffect, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';


const Property = () => {


    const [loading, setLoading] = useState(true);
    //state that can be changed by calling upon setLoading which will update the state in this case loading
    const [searchResult, setSearchResult] = useState([]);

    const [properties, setProperties] = useState([]);
    // currently state used to showcase the data onto the webpage below via a map function which returns an array of a defined value in his case of properties

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

       {loading ? (
        <div>Loading...</div>
        // turnery statement to allow for a loading if the condition is true else it will render the infromation on to the webpage
      ) : (
        properties.map((property) => (
          <div key={property.id}>
            <h2>Address:&nbsp;{property.address}</h2>
            <p>Type:&nbsp;{property.type}</p>
            <p>Gardens:&nbsp;{property.garden}</p>
            <p>Price:&nbsp;£{property.price}</p>
          </div>
          //data displayed from fetched data above, placed in state and then map function used to show case the data to the screen
          //for each property
        ))
      )}
      
    </>
     );
}
 
export default Property;
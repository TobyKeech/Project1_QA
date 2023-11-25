
import React, { useEffect, useState } from 'react';
const Booking = () => {

const [buyers, setBuyers] = useState([]);


useEffect(()=>{
    fetch ("http://localhost:3000/buyer")
    //get the json content across
.then((reponse)=>{
    if (!reponse){
        alert ("Error occured, unable to retrieve buyer data")
        throw reponse.status
        //if statement that if data cannot be loaded then a alert will be displayed alonfg with the http code from the reponse status
    
    } else return reponse.json();    
})

.then(buyers => {
    setBuyers(buyers)
    //sets the state of buyers above with the data from the response, done by using the setBuyers function into an empty array
    console.log(buyers)
    //check if the buyers object has been passed the information from JSON
})
.catch( error => console.error(error))
//provides and error message if promise not caught and passed to the buyer fetch
}, [])
//stored in a lsit to access data later via the map function of JS




return ( 

        <div>
            this is the bookings page
        </div>
        );
}
 
export default Booking;
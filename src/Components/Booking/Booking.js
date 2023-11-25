import React, { useEffect, useState } from 'react';
const Booking = () => {

const [buyers, setBuyers] = useState([]);
const[loadingBoooking, setLoadingBooking] = useState(false)



useEffect(()=>{
    setLoadingBooking(true)
    //changes the state of the loadings state to true
    fetch("http://localhost:8081/booking")
    // gets the booking json data
    .then((response)=>{
            if(!response.ok) {
                alert("error has occured. Cannot laod booking data")
                throw response.status;
            } else return response.json();
    })
    .then(bookings => {
        setLoadingBooking(false)
        //setting state to false as was set to true above changing the state
        console.log(bookings)
    })
    .catch(error => {
        console.error(error);
        setLoadingBooking(false);
    })

}, [])


useEffect(()=> {
        fetch("http://localhost:8081/buyer")
        //get the json content from the backend server to render

        .then((response)=> {
            if( !response.ok) {
                alert("Error occured, could not load data of buyers")
                throw response.status
                //returns the status of the resonse back to the user ie 202 or 404
            } else return response.json();
            // if everything is good return the buyers json data in the response
        })

        .then(buyers => {
                console.log(buyers)
                //check what is contained within buyers, list of buyers displayed within the console
        })

        .catch(error => {
            console.log(error)
            alert("Error has occured getting the data")
            //bring an alert if the json data doesnt load properly
        })
        
},[])
//this gets set into a new array to then use further down

return ( 

        <div>
            this is the bookings page
        </div>
        );
}
 
export default Booking;
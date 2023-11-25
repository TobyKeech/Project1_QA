import { useEffect, useState } from "react";

const Buyer = () => {

    const [loading, setLoading] = useState(true);
    //state that can be changed by calling upon setLoading which will update the state in this case loading to true or false
    //by manipulating state

    useEffect(()=> {
        setLoading(true)
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
                    setLoading(false);
                    //manipulates the state to set this to false whena ction is complete, this started as true above in state 
                    console.log(buyers)
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

        <div>
            this is the buyers page
        </div>
    );
}
 
export default Buyer;
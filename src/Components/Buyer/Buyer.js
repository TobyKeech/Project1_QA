import { useEffect, useState } from "react";

const Buyer = () => {

    const [loading, setLoading] = useState(true);
    //state that can be changed by calling upon setLoading which will update the state in this case loading to true or false
    //by manipulating state

    const [buyers, setBuyers] = useState([]);

    const [saving, setSaving] = useState(false);
    //state to change the state of saving for alerts etc

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
              dispatch({type: "SET", payload: buyers});
                    //set the buyers into the dispatch with the type of set, this will return the state dependent on thea action:type
                    setLoading(false);
                    //manipulates the state to set this to false when action is complete, this started as true above in state 
                    console.log(buyers)
                    // setBuyers(buyers)
                    //check what is contained within buyers, list of buyers displayed within the console
            })
    
            .catch(error => {
                setLoading(false)
                console.log(error)
                alert("Error has occured getting the data")
                //bring an alert if the json data doesnt load properly
            })
            
    },[])
    //this gets set into a new array to then use further down within the return

   
    return (  
        <>
         <>
       <div>

       {loading ? (
        <div>Loading...</div>
        // turnery statement to allow for a loading if the condition is true else it will render the inforamtion on to the webpage
      ) : (
        buyers.map((buyer) => (
          <div key={buyer.id}>
            <h2>{buyer.firstName} &nbsp; {buyer.surname} </h2>
            <p>{buyer.address},&nbsp;{buyer.postcode}</p>
          </div>
        ))
      )}
       </div>
    </>
        </>
    );
}
 
export default Buyer;
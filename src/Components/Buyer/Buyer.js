import { response } from "express";
import { useEffect, useReducer, useState } from "react";

const Buyer = () => {

    const [loading, setLoading] = useState(true);
    //state that can be changed by calling upon setLoading which will update the state in this case loading to true or false
    //by manipulating state

    const [buyers, setBuyers] = useState([]);

    const [saving, setSaving] = useState(false);
    //state to change the state of saving for alerts etc

    const reducedBuyersList = (state, action) => {
      //used in the useReducer to manipulate the state
      switch (action.type){
        case "ADD":
            return state.concat(action.payload);
          // if action.type is set to "ADD" then the new state is added to the current state and updated
        case "SET":
          return action.payload;
          // if the action.type is set to "SET" then current state returned 
        case "REMOVE":
          return state.filter(buyer => buyer.id !== action.payload);
        // DO RESEARCH ON THIS
        default:
          return state;
          //otherwise will return the state as it was 
      }
    };
    const [listOfBuyers, dispatch] = useReducer(reducedBuyersList, []);


      const buyerAddHandler = (newBuyer) => {
        setSaving(true);
        fetch("http://localhost:8081/buyer", {
          method: "POST",
          headers : {"Content-Type" : "applicattion/json"},
          body: JSON.stringify(newBuyer)
        }
        ).then((response) => {
          if (!response.ok){
            alert("error has occured, unable to add buyer")
            setSaving(false);
            throw response.status;
          } else return response.json();
        }
        ).then(newBuyer => {
          setSaving(false);
          dispatch ({type: "ADD", payload: newBuyer})
        });
      };

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